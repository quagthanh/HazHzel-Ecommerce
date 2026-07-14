import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import {
  isValidId,
  paginationAggregate,
  paginationAggregateNew,
  ProductRedisKeys,
} from '@/shared/helpers/utils';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { RemoveImage } from './dto/remove-image.dto';
import slugify from 'slugify';
import { SupplierService } from '../supplier/supplier.service';
import { CategoryService } from '../category/category.service';
import { CollectionService } from '../collection/collection.service';
import { GenderType } from '@/shared/enums/typeGenderProduct.enm';
import { VariantService } from '../variant/variant.service';
import { ProductSortType } from '@/shared/enums/productSortType.enum';
import { ProductFilterDto } from './dto/product-filter.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly supplierService: SupplierService,
    private readonly categoryService: CategoryService,
    private readonly collectionService: CollectionService,
    private readonly variantService: VariantService,
    private readonly redisService: RedisService,
  ) { }

  private checkSlugExist = async (slug: string): Promise<boolean> => {
    const isSlugExist = await this.productModel.exists({ slug });
    return !!isSlugExist;
  };
  private generateSlugUnique = async (text: string): Promise<string> => {
    const baseSlug = slugify(text, {
      replacement: '-',
      trim: true,
      lower: true,
      locale: 'vi',
    });
    let slug = baseSlug;
    let count = 1;
    while (await this.checkSlugExist(slug)) {
      slug = `${baseSlug}-${count++}`;
    }

    return slug;
  };
  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[] = [],
  ) {
    const { name, ...otherFields } = createProductDto;
    const slug = await this.generateSlugUnique(name);
    if (!files || files.length === 0) {
      throw new BadRequestException('Please choose at least 1 picture');
    }
    const uploadedImages = await this.cloudinaryService.uploadMultiFiles(files);
    try {
      const newProduct = await this.productModel.create({
        images: uploadedImages,
        name,
        slug,
        ...otherFields,
      });
      return newProduct;
    } catch (error) {
      console.error('Error while creating new product:', error);
      const delete_image_ids = uploadedImages.map((image) => image.public_id);
      await this.cloudinaryService.deleteFiles(delete_image_ids);
    }
  }

  async findAllForAdmin(query: string, current: number, pageSize: number) {
    const queryParams = new URLSearchParams(query);
    const gender = queryParams.get('gender');

    const customMatchStage: any = {};

    if (gender) {
      if (gender === GenderType.MEN) {
        customMatchStage.gender = { $in: [GenderType.MEN, GenderType.UNISEX] };
      } else if (gender === GenderType.WOMEN) {
        customMatchStage.gender = {
          $in: [GenderType.WOMEN, GenderType.UNISEX],
        };
      } else {
        customMatchStage.gender = gender;
      }

      queryParams.delete('gender');
    }
    const cleanQuery = queryParams.toString();

    const pipeline = [
      ...(Object.keys(customMatchStage).length > 0
        ? [{ $match: customMatchStage }]
        : []),

      {
        $lookup: {
          from: 'variants',
          localField: '_id',
          foreignField: 'productId',
          as: 'variants',
        },
      },
      {
        $unwind: {
          path: '$variants',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          'variants.currentPrice': 1,
        },
      },
      {
        $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' },
          cheapestVariant: { $first: '$$ROOT.variants' },
          stockQuantity: { $sum: `$$ROOT.variants.stock` },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$doc',
              {
                originalPrice: '$cheapestVariant.originalPrice',
                discountPrice: '$cheapestVariant.discountPrice',
                currentPrice: '$cheapestVariant.currentPrice',
                stockQuantity: `$stockQuantity`,
              },
            ],
          },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categoryId',
        },
      },
      {
        $unwind: {
          path: '$categoryId',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'suppliers',
          localField: 'supplierId',
          foreignField: '_id',
          as: 'supplierId',
        },
      },
      {
        $unwind: {
          path: '$supplierId',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          variants: 0,
        },
      },
    ];

    return paginationAggregate(
      this.productModel,
      cleanQuery,
      current,
      pageSize,
      pipeline,
    );
  }
  async findAll(filterDto: ProductFilterDto) {
    const customMatchStage: any = {};
    const gender = filterDto.gender;
    const category = filterDto.filterCategory;
    const brand = filterDto.filterBrand;
    const current = filterDto.current ?? 1;
    const pageSize = filterDto.pageSize ?? 10;
    const minPrice = filterDto.minPrice;
    const maxPrice = filterDto.maxPrice;

    const variantAttributeMatch: any[] = [];
    const priceMatch: any = {};

    if (minPrice !== undefined) {
      priceMatch.$gte = Number(minPrice);
    }

    if (maxPrice !== undefined) {
      priceMatch.$lte = Number(maxPrice);
    }

    let sortPipeLine: Record<string, 1 | -1> = {
      createAt: -1,
    };

    if (sortPipeLine) {
      switch (filterDto.sort) {
        case ProductSortType.DATE_ASC:
          sortPipeLine = { createdAt: 1 };
          break;
        case ProductSortType.DATE_DESC:
          sortPipeLine = { createdAt: -1 };
          break;
        case ProductSortType.PRICE_ASC:
          sortPipeLine = { currentPrice: 1 };
          break;
        case ProductSortType.PRICE_DESC:
          sortPipeLine = { currentPrice: -1 };
          break;
        default:
          sortPipeLine = { createAt: -1 };
      }
    }
    if (gender) {
      if (gender === GenderType.MEN) {
        customMatchStage.gender = { $in: [GenderType.MEN, GenderType.UNISEX] };
      } else if (gender === GenderType.WOMEN) {
        customMatchStage.gender = {
          $in: [GenderType.WOMEN, GenderType.UNISEX],
        };
      } else {
        customMatchStage.gender = gender;
      }
    }

    if (category) {
      const categoryIds = await this.categoryService.findIdBySlugs(category);
      if (categoryIds) {
        customMatchStage.categoryId = { $in: categoryIds };
      }
    }

    if (brand) {
      const supplierIds = await this.supplierService.findIdBySlugs(brand);
      if (supplierIds) {
        customMatchStage.supplierId = { $in: supplierIds };
      }
    }

    if (filterDto.filterColor) {
      variantAttributeMatch.push({
        'variants.attributes': {
          $elemMatch: {
            k: 'Color',
            v: filterDto.filterColor,
          },
        },
      });
    }

    if (filterDto.filterSize) {
      variantAttributeMatch.push({
        'variants.attributes': {
          $elemMatch: {
            k: 'Size',
            v: filterDto.filterSize,
          },
        },
      });
    }

    const pipeline = [
      {
        $lookup: {
          from: 'variants',
          localField: '_id',
          foreignField: 'productId',
          as: 'variants',
        },
      },
      {
        $lookup: {
          from: 'suppliers',
          localField: 'supplierId',
          foreignField: '_id',
          as: 'supplier',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categories',
        },
      },
      {
        $unwind: {
          path: '$categories',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$supplier',
          preserveNullAndEmptyArrays: true,
        },
      },
      { $unwind: { path: '$variants', preserveNullAndEmptyArrays: true } },
      ...(variantAttributeMatch.length > 0
        ? [
          {
            $match: {
              $and: variantAttributeMatch,
            },
          },
        ]
        : []),
      ...(Object.keys(priceMatch).length > 0
        ? [
          {
            $match: {
              'variants.currentPrice': priceMatch,
            },
          },
        ]
        : []),
      { $sort: { 'variants.currentPrice': 1 } },
      {
        $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' },
          cheapestVariant: { $first: '$$ROOT.variants' },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$doc',
              {
                originalPrice: '$cheapestVariant.originalPrice',
                discountPrice: '$cheapestVariant.discountPrice',
                currentPrice: '$cheapestVariant.currentPrice',
              },
            ],
          },
        },
      },
    ];
    return paginationAggregateNew(
      this.productModel,
      current,
      pageSize,
      sortPipeLine,
      pipeline,
      customMatchStage,
    );
  }

  async findBySupplier(
    supplierSlug: string,
    query: string,
    current: number,
    pageSize: number,
  ) {
    const supplierId = await this.supplierService.findIdBySlug(supplierSlug);

    const queryParams = new URLSearchParams(query);
    const categorySlug = queryParams.get('category');
    const size = queryParams.get('size');
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');
    const sort = queryParams.get('sort');

    const productMatchStage: any = {
      supplierId: new Types.ObjectId(supplierId),
    };

    if (categorySlug) {
      const categoryId = await this.categoryService.findIdBySlug(categorySlug);
      if (categoryId) {
        productMatchStage.categoryId = new Types.ObjectId(categoryId);
      }
    }

    const variantMatchStage: any = {};

    if (minPrice || maxPrice) {
      variantMatchStage['variants.currentPrice'] = {};
      if (minPrice)
        variantMatchStage['variants.currentPrice'].$gte = Number(minPrice);
      if (maxPrice)
        variantMatchStage['variants.currentPrice'].$lte = Number(maxPrice);
    }

    if (size) {
      variantMatchStage['variants.attributes'] = {
        $elemMatch: { k: 'Size', v: size },
      };
    }

    let sortStage: any = { 'variants.currentPrice': 1 };
    if (sort) {
      if (sort === 'price-desc') sortStage = { 'variants.currentPrice': -1 };
      else if (sort === 'price-asc') sortStage = { 'variants.currentPrice': 1 };
    }

    queryParams.delete('category');
    queryParams.delete('size');
    queryParams.delete('minPrice');
    queryParams.delete('maxPrice');
    queryParams.delete('sort');
    queryParams.delete('inStock');

    const cleanQuery = queryParams.toString();

    return paginationAggregate(
      this.productModel,
      cleanQuery,
      current,
      pageSize,
      [
        {
          $match: productMatchStage,
        },
        {
          $lookup: {
            from: 'variants',
            localField: '_id',
            foreignField: 'productId',
            as: 'variants',
          },
        },
        {
          $unwind: {
            path: '$variants',
            preserveNullAndEmptyArrays: false,
          },
        },
        ...(Object.keys(variantMatchStage).length > 0
          ? [{ $match: variantMatchStage }]
          : []),

        {
          $sort: sortStage,
        },

        {
          $group: {
            _id: '$_id',
            doc: { $first: '$$ROOT' },
            cheapestVariant: { $first: '$variants' },
          },
        },

        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                '$doc',
                {
                  originalPrice: '$cheapestVariant.originalPrice',
                  discountPrice: '$cheapestVariant.discountPrice',
                  currentPrice: '$cheapestVariant.currentPrice',
                },
              ],
            },
          },
        },

        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'categoryId',
          },
        },
        {
          $unwind: {
            path: '$categoryId',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            variants: 0,
          },
        },
      ],
    );
  }
  async findHomeNewBrand(
    supplierSlug: string,
    query: string,
    current: number,
    pageSize: number,
  ) {
    const supplierId = await this.supplierService.findIdBySlug(supplierSlug);

    const productHomeNewBrand = await paginationAggregate(this.productModel, query, current, pageSize, [
      {
        $match: {
          supplierId: new Types.ObjectId(supplierId),
        },
      },
      {
        $lookup: {
          from: 'variants',
          localField: '_id',
          foreignField: 'productId',
          as: 'variants',
        },
      },
      {
        $unwind: {
          path: '$variants',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          'variants.currentPrice': 1,
        },
      },
      {
        $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' },
          cheapestVariant: { $first: '$variants' },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$doc',
              {
                originalPrice: '$cheapestVariant.originalPrice',
                discountPrice: '$cheapestVariant.discountPrice',
                currentPrice: '$cheapestVariant.currentPrice',
              },
            ],
          },
        },
      },

      {
        $project: {
          variants: 0,
        },
      },
    ]);
    // await this.redis.set('app:home-new-brand', JSON.stringify(productHomeNewBrand),);
    return productHomeNewBrand;
  }
  async findByCategory(
    categorySlug: string,
    query: string,
    current: number,
    pageSize: number,
  ) {
    const categoryId = await this.categoryService.findIdBySlug(categorySlug);

    const queryParams = new URLSearchParams(query);
    const size = queryParams.get('size');
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');
    const sort = queryParams.get('sort');
    const brandSlug = queryParams.get('brand');

    const productMatchStage: any = {
      categoryId: new Types.ObjectId(categoryId),
    };

    if (brandSlug) {
      const supplierId = await this.supplierService.findIdBySlug(brandSlug);
      if (supplierId) {
        productMatchStage.supplierId = new Types.ObjectId(supplierId);
      }
    }

    const variantMatchStage: any = {};

    if (minPrice || maxPrice) {
      variantMatchStage['variants.currentPrice'] = {};
      if (minPrice)
        variantMatchStage['variants.currentPrice'].$gte = Number(minPrice);
      if (maxPrice)
        variantMatchStage['variants.currentPrice'].$lte = Number(maxPrice);
    }

    if (size) {
      variantMatchStage['variants.attributes'] = {
        $elemMatch: { k: 'Size', v: size },
      };
    }

    let sortStage: any = { 'variants.currentPrice': 1 };
    if (sort) {
      if (sort === 'price-desc') sortStage = { 'variants.currentPrice': -1 };
      else if (sort === 'price-asc') sortStage = { 'variants.currentPrice': 1 };
    }

    queryParams.delete('size');
    queryParams.delete('minPrice');
    queryParams.delete('maxPrice');
    queryParams.delete('sort');
    queryParams.delete('brand');

    const cleanQuery = queryParams.toString();

    return paginationAggregate(
      this.productModel,
      cleanQuery,
      current,
      pageSize,
      [
        {
          $match: productMatchStage,
        },

        {
          $lookup: {
            from: 'variants',
            localField: '_id',
            foreignField: 'productId',
            as: 'variants',
          },
        },

        {
          $unwind: {
            path: '$variants',
            preserveNullAndEmptyArrays: false,
          },
        },

        ...(Object.keys(variantMatchStage).length > 0
          ? [{ $match: variantMatchStage }]
          : []),

        {
          $sort: sortStage,
        },

        {
          $group: {
            _id: '$_id',
            doc: { $first: '$$ROOT' },
            cheapestVariant: { $first: '$variants' },
          },
        },

        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                '$doc',
                {
                  originalPrice: '$cheapestVariant.originalPrice',
                  discountPrice: '$cheapestVariant.discountPrice',
                  currentPrice: '$cheapestVariant.currentPrice',
                },
              ],
            },
          },
        },

        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'categoryId',
          },
        },
        {
          $unwind: {
            path: '$categoryId',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            variants: 0,
          },
        },
      ],
    );
  }
  async findByCollection(
    collectionSlug: string,
    query: string,
    current: number,
    pageSize: number,
  ) {
    const collectionId =
      await this.collectionService.findIdBySlug(collectionSlug);

    const queryParams = new URLSearchParams(query);
    const size = queryParams.get('size');
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');
    const sort = queryParams.get('sort');
    const brandSlug = queryParams.get('brand');

    const productMatchStage: any = {
      collectionId: new Types.ObjectId(collectionId),
    };

    if (brandSlug) {
      const supplierId = await this.supplierService.findIdBySlug(brandSlug);
      if (supplierId) {
        productMatchStage.supplierId = new Types.ObjectId(supplierId);
      }
    }

    const variantMatchStage: any = {};

    if (minPrice || maxPrice) {
      variantMatchStage['variants.currentPrice'] = {};
      if (minPrice)
        variantMatchStage['variants.currentPrice'].$gte = Number(minPrice);
      if (maxPrice)
        variantMatchStage['variants.currentPrice'].$lte = Number(maxPrice);
    }

    if (size) {
      variantMatchStage['variants.attributes'] = {
        $elemMatch: { k: 'Size', v: size },
      };
    }

    let sortStage: any = { 'variants.currentPrice': 1 };
    if (sort) {
      if (sort === 'price-desc') sortStage = { 'variants.currentPrice': -1 };
      else if (sort === 'price-asc') sortStage = { 'variants.currentPrice': 1 };
    }

    queryParams.delete('size');
    queryParams.delete('minPrice');
    queryParams.delete('maxPrice');
    queryParams.delete('sort');
    queryParams.delete('brand');

    const cleanQuery = queryParams.toString();

    return paginationAggregate(
      this.productModel,
      cleanQuery,
      current,
      pageSize,
      [
        {
          $match: productMatchStage,
        },

        {
          $lookup: {
            from: 'variants',
            localField: '_id',
            foreignField: 'productId',
            as: 'variants',
          },
        },

        {
          $unwind: {
            path: '$variants',
            preserveNullAndEmptyArrays: false,
          },
        },

        ...(Object.keys(variantMatchStage).length > 0
          ? [{ $match: variantMatchStage }]
          : []),

        {
          $sort: sortStage,
        },

        {
          $group: {
            _id: '$_id',
            doc: { $first: '$$ROOT' },
            cheapestVariant: { $first: '$variants' },
          },
        },

        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                '$doc',
                {
                  originalPrice: '$cheapestVariant.originalPrice',
                  discountPrice: '$cheapestVariant.discountPrice',
                  currentPrice: '$cheapestVariant.currentPrice',
                },
              ],
            },
          },
        },

        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'categoryId',
          },
        },
        {
          $unwind: {
            path: '$categoryId',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            variants: 0,
          },
        },
      ],
    );
  }

  async findByProductSlug(slug: string) {
    let cacheKey = ProductRedisKeys.detail(slug)
    const cacheData = await this.redisService.get(cacheKey)
    if (cacheData) {
      return JSON.parse(cacheData)
    }
    const product = await this.productModel
      .findOne({ slug: slug })
      .populate(['supplierId', { path: 'categoryId' }])
      .lean();
    if (!product) {
      throw new BadRequestException('Can not find product');
    }
    const variants = await this.variantService.findByProduct(
      product._id.toString(),
    );
    if (!variants) {
      throw new BadRequestException('Can not find data');
    }
    const result = {
      ...product,
      variants: variants || [],
    }
    await this.redisService.set(cacheKey, JSON.stringify(result), 86400)
    return result
  }

  async searchByKeyword(keyword: string) {
    const regex = new RegExp(keyword, 'i');

    return this.productModel.aggregate([
      {
        $match: {
          name: { $regex: regex },
          status: 'ACTIVE',
        },
      },

      {
        $lookup: {
          from: 'variants',
          localField: '_id',
          foreignField: 'productId',
          as: 'variants',
        },
      },
      {
        $addFields: {
          cheapestVariant: { $arrayElemAt: ['$variants', 0] },
        },
      },
      {
        $lookup: {
          from: 'suppliers',
          localField: 'supplierId',
          foreignField: '_id',
          as: 'supplier',
        },
      },
      { $unwind: { path: '$supplier', preserveNullAndEmptyArrays: true } },

      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          images: { $slice: ['$images', 1] },
          price: '$cheapestVariant.currentPrice',
          supplier: '$supplier.name',
        },
      },
    ]);
  }
  async findTopViewed(limit: number = 10) {
    return this.productModel.aggregate([
      { $match: { status: 'ACTIVE' } },
      { $sort: { views: -1 } },
      { $limit: limit },

      {
        $lookup: {
          from: 'variants',
          localField: '_id',
          foreignField: 'productId',
          as: 'variants',
        },
      },
      {
        $addFields: {
          cheapestVariant: { $arrayElemAt: ['$variants', 0] },
        },
      },
      {
        $lookup: {
          from: 'suppliers',
          localField: 'supplierId',
          foreignField: '_id',
          as: 'supplier',
        },
      },
      { $unwind: { path: '$supplier', preserveNullAndEmptyArrays: true } },

      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          views: 1,
          images: { $slice: ['$images', 1] },
          price: '$cheapestVariant.currentPrice',
          supplier: '$supplier.name',
        },
      },
    ]);
  }
  async increaseProductView(slug: string): Promise<number> {
    return await this.productModel.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true },
    );
  }

  async update(
    _id: string,
    updateProductDto: UpdateProductDto,
    files: Express.Multer.File[],
  ) {
    const product = await this.productModel.findById(_id);
    if (!product)
      throw new BadRequestException('Can not find product to update');

    const keptImages = updateProductDto.existingImages
      ? JSON.parse(updateProductDto.existingImages)
      : [];
    const currentImages = product.images ?? [];

    const finalImages = await this.cloudinaryService.synImages(
      currentImages,
      keptImages,
      files,
    );

    product.images = finalImages;
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.categoryId = updateProductDto.categoryId
      ? new Types.ObjectId(updateProductDto.categoryId)
      : product.categoryId;
    product.supplierId = updateProductDto.supplierId
      ? new Types.ObjectId(updateProductDto.supplierId)
      : product.supplierId;
    product.gender = updateProductDto.gender ?? product.gender;
    product.status = updateProductDto.status ?? product.status;
    product.isSale = updateProductDto.isSale ?? product.isSale;
    product.isHot = updateProductDto.isHot ?? product.isHot;
    product.isNewArrival =
      updateProductDto.isNewArrival ?? product.isNewArrival;

    const updatedProduct = await product.save()
    if (updatedProduct && product.slug) {
      const cacheKey = ProductRedisKeys.detail(product.slug)
      await this.redisService.del(cacheKey)
    }
    return updatedProduct
  }

  async remove(_id: string) {
    const data = await this.productModel.findById(_id);
    if (!data) {
      throw new BadRequestException('Không tìm thấy id sản phẩm');
    }
    const id_image = data?.images.map((img) => img.public_id);
    await this.cloudinaryService.deleteFiles(id_image);
    return await this.productModel.deleteOne({ _id });
  }

  async removeImage(_id: string, removeImage: RemoveImage) {
    const { public_id } = removeImage;
    if (!isValidId(_id)) {
      throw new BadRequestException('Id sản phẩm không hợp lệ');
    }
    const product = await this.productModel.findById(_id);
    if (!product) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }
    const imageExists = product.images.find(
      (img) => img.public_id === public_id,
    );
    if (!imageExists) {
      throw new BadRequestException('Ảnh không tồn tại trong sản phẩm');
    }
    await this.cloudinaryService.deleteFile(public_id);
    const updatedImages = product.images.filter(
      (img) => img.public_id !== public_id,
    );
    await this.productModel.updateOne({ _id: _id }, { images: updatedImages });
    return { message: 'Đã xóa ảnh thành công' };
  }


  // async removeImages(_id: string, removeImage: RemoveImage) {
  //   const { public_ids } = removeImage;

  //   if (!isValidId(_id)) {
  //     throw new BadRequestException('Id sản phẩm để remove image không hợp lệ');
  //   }

  //   const data = await this.productModel.findById(_id);
  //   if (!data) {
  //     throw new BadRequestException('Không tìm thấy sản phẩm để remove image');
  //   }

  //   const currentImages = data.images;

  //   // Giữ lại ảnh KHÔNG nằm trong danh sách cần xóa
  //   const remainingImages = currentImages.filter(
  //     (img) => !public_ids.includes(img.public_id),
  //   );

  //   // Xóa trên Cloudinary
  //   await this.cloudinaryService.deleteFiles(public_ids);

  //   // Cập nhật trong DB
  //   return await this.productModel.updateOne(
  //     { _id },
  //     { images: remainingImages },
  //   );
  // }
}

