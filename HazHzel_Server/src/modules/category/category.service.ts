import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model, Types } from 'mongoose';
import slugify from 'slugify';
import aqp from 'api-query-params';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { pagination } from '@/shared/helpers/utils';
import { GenderType } from '@/shared/enums/typeGenderProduct.enm';
import { Product } from '../product/schemas/product.schema';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  private createBaseSlug(name: string): string {
    return slugify(name, {
      replacement: '-',
      trim: true,
      lower: true,
      locale: 'vi',
    });
  }
  private generateFullPathSlug = async (
    name: string,
    parrentId: string,
  ): Promise<string> => {
    const baseSlug = this.createBaseSlug(name);
    if (parrentId) {
      const parrent = await this.categoryModel.findById(parrentId);
      if (parrent) {
        return `${parrent?.slug}/${baseSlug}`;
      }
    }
    return `/${baseSlug}`;
  };

  async create(
    createCategoryDto: CreateCategoryDto,
    files: Express.Multer.File[] = [],
  ) {
    const { name, parentCategory, ...otherFields } = createCategoryDto;
    const slug = await this.generateFullPathSlug(name, parentCategory);
    const exists = await this.categoryModel.exists({ slug });
    if (exists) {
      throw new BadRequestException(
        `Slug '${slug}' is exist.Please change category name.`,
      );
    }
    // if (!files || files.length === 0) {
    //   throw new BadRequestException('Please choose atleast 1 picture');
    // }
    let simplifiedImages = [];
    if (files && files.length > 0) {
      const uploadedImages =
        await this.cloudinaryService.uploadMultiFiles(files);
      simplifiedImages = uploadedImages.map((img) => ({
        public_id: img.public_id,
        secure_url: img.secure_url,
        width: img.width,
        height: img.height,
      }));
    }

    return this.categoryModel.create({
      name,
      slug,
      images: simplifiedImages,
      parentCategory: parentCategory,
      ...otherFields,
    });
  }
  async findAll(query: string, current: number = 1, pageSize: number = 5) {
    const { filter, sort } = aqp(query);
    if (!current) current = 1;
    if (!pageSize) pageSize = 5;

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    const totalItems = await this.categoryModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);

    const result = await this.categoryModel.find(filter).sort(sort as any);
    return {
      meta: {
        current: current,
        pageSize: pageSize,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }
  async findAllForAdmin(query: string, current: number, pageSize: number) {
    return pagination(this.categoryModel, query, current, pageSize);
  }

  async findOne(_id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Category id không hợp lệ');
    }

    const category = await this.categoryModel.findById(_id);
    if (!category) {
      throw new NotFoundException('Không tìm thấy category');
    }

    return category;
  }

  async findIdBySlug(slug: string): Promise<Types.ObjectId> {
    console.log('Check id input in findIdBySlug:', slug);
    const newSlug = `/${slug}`;
    const category = await this.categoryModel.findOne({ slug: newSlug });

    if (!category) {
      throw new NotFoundException(`Category với slug "${slug}" không tồn tại`);
    }
    return category._id;
  }

  async update(
    _id: string,
    updateCategoryDto: UpdateCategoryDto,
    files: Express.Multer.File[] = [],
  ) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Category id is not valid');
    }

    const currentCategory = await this.categoryModel.findById(_id);
    if (!currentCategory) {
      throw new NotFoundException('Category is not exist');
    }
    const { name, parentCategory, ...otherFields } = updateCategoryDto;
    let newSlug = currentCategory.slug;
    let shouldUpdateChildren = false;
    const isNameChanged = name && name !== currentCategory.name;
    const isParentChanged =
      parentCategory !== undefined &&
      parentCategory !== String(currentCategory.parentCategory);

    if (isNameChanged || isParentChanged) {
      const targetName = name || currentCategory.name;
      const targetParentId =
        parentCategory !== undefined
          ? parentCategory
          : String(currentCategory.parentCategory);

      if (targetParentId === _id) {
        throw new BadRequestException('A category cannot be its own parent.');
      }

      newSlug = await this.generateFullPathSlug(
        targetName,
        targetParentId === 'null' ? undefined : targetParentId,
      );
      shouldUpdateChildren = true;
    }

    let finalImages = currentCategory.images;
    if (files.length > 0) {
      const uploadedImages =
        await this.cloudinaryService.uploadMultiFiles(files);
      const newImages = uploadedImages.map((img) => ({
        public_id: img.public_id,
        secure_url: img.secure_url,
        width: img.width,
        height: img.height,
      }));
      finalImages = [...finalImages, ...newImages];
    }

    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      _id,
      {
        ...otherFields,
        name: name || currentCategory.name,
        slug: newSlug,
        parentCategory: parentCategory || currentCategory.parentCategory,
        images: finalImages,
      },
      { new: true },
    );

    if (shouldUpdateChildren) {
      await this.updateChildrenSlugs(_id, newSlug);
    }

    return updatedCategory;
  }

  private async updateChildrenSlugs(parentId: string, parentSlug: string) {
    const children = await this.categoryModel.find({
      parentCategory: parentId,
    });

    for (const child of children) {
      const childBaseSlug = this.createBaseSlug(child.name);
      const newChildSlug = `${parentSlug}/${childBaseSlug}`;

      await this.categoryModel.updateOne(
        { _id: child._id },
        { slug: newChildSlug },
      );

      await this.updateChildrenSlugs(child._id.toString(), newChildSlug);
    }
  }

  async remove(_id: string) {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Category id is not valid');
    }

    const category = await this.categoryModel.findById(_id);
    if (!category) {
      throw new NotFoundException('Can not find category');
    }
    await this.categoryModel.updateMany(
      { parentCategory: _id },
      { $set: { parentCategory: null } },
    );
    return this.categoryModel.deleteOne({ _id });
  }

  private buildTree(categories: any[], parentId: string | null = null): any[] {
    return categories
      .filter(
        (c) =>
          (c.parentCategory ? c.parentCategory.toString() : null) === parentId,
      )
      .map((c) => ({
        _id: c._id,
        name: c.name,
        slug: c.slug,
        children: this.buildTree(categories, c._id.toString()),
      }));
  }

  private getCategoryAndAncestors(catId: string, allCategories: any[]): any[] {
    const category = allCategories.find((c) => c._id.toString() === catId);
    if (!category) {
      return [];
    }
    if (category.parentCategory) {
      const parentId = category.parentCategory.toString();
      const parents = this.getCategoryAndAncestors(parentId, allCategories);
      return [category, ...parents];
    }
    return [category];
  }
  async getNavMetadata() {
    const allCategories = await this.categoryModel
      .find({ status: 'ACTIVE' })
      .lean();

    const navGroups = [
      {
        label: 'MEN',
        filter: { gender: GenderType.MEN, status: 'ACTIVE' },
        params: `gender=${GenderType.MEN}`,
      },
      {
        label: 'WOMEN',
        filter: { gender: GenderType.WOMEN, status: 'ACTIVE' },
        params: `gender=${GenderType.WOMEN}`,
      },

      {
        label: 'SALE',
        filter: { isSale: true, status: 'ACTIVE' },
        params: 'isSale=true',
      },
      //   {
      //   label: 'NEW ARRIVALS',
      //   filter: {
      //     createdAt: { $gte: thirtyDaysAgo },
      //     status: 'ACTIVE'
      //   },
      //   params: 'sort=-createdAt',
      // },
      //Khi khách click vào "NEW ARRIVALS", link sẽ là: /products?sort=-createdAt.
    ];

    const navData = [];

    for (const group of navGroups) {
      const usedCategoryIds = await this.productModel
        .find(group.filter)
        .distinct('categoryId');

      let activeCategoryList: any[] = [];
      for (const idObj of usedCategoryIds) {
        const lineage = this.getCategoryAndAncestors(
          idObj.toString(),
          allCategories,
        );
        activeCategoryList.push(...lineage);
      }

      const uniqueCategories = Array.from(
        new Map(
          activeCategoryList.map((item) => [item._id.toString(), item]),
        ).values(),
      );

      if (uniqueCategories.length > 0) {
        navData.push({
          label: group.label,
          baseParams: group.params,
          items: this.buildTree(uniqueCategories, null),
        });
      }
    }

    return navData;
  }
}
