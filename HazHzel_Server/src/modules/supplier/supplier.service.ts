import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Supplier } from './schemas/supplier.schema';
import { Model, Types } from 'mongoose';
import { isValidId, pagination } from '@/shared/helpers/utils';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Product } from '../product/schemas/product.schema';
import slugify from 'slugify';
import { statusSupplier } from '@/shared/enums/statusSupplier.enum';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name) private readonly supplierModel: Model<Supplier>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) { }

  private checkSlugExist = async (slug: string): Promise<boolean> => {
    const isSlugExist = await this.supplierModel.exists({ slug });
    return !!isSlugExist;
  };
  private generateSlugUnique = async (text: string): Promise<string> => {
    let baseSlug = slugify(text, {
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
    createSupplierDto: CreateSupplierDto,
    files: Express.Multer.File[] = [],
  ) {
    const { name, ...otherFields } = createSupplierDto;
    const slug = await this.generateSlugUnique(name);

    if (!files || files.length === 0) {
      throw new BadRequestException('Please choose at least 1 picture');
    }
    const uploadedImages = await this.cloudinaryService.uploadMultiFiles(files);
    try {
      const newSupplier = await this.supplierModel.create({
        images: uploadedImages,
        name,
        slug,
        ...otherFields,
      });
      return newSupplier;
    } catch (error) {
      console.error('Error while creating new supplier:', error);
      const delete_image_ids = uploadedImages.map((image) => image.public_id);
      await this.cloudinaryService.deleteFiles(delete_image_ids);
    }
  }
  async findAll(query: string, current: number = 1, pageSize: number = 5) {
    return pagination(this.supplierModel, query, current, pageSize);

  }
  async findAllForAdmin(query: string, current: number, pageSize: number) {
    return pagination(this.supplierModel, query, current, pageSize);
  }

  async findOne(_id: string) {
    if (!isValidId(_id)) {
      throw new BadRequestException('Id supplier không hợp lệdadw');
    }

    const supplier = await this.supplierModel.findById(_id);
    if (!supplier) {
      throw new NotFoundException('Không tìm thấy supplier');
    }

    return supplier;
  }
  async findIdBySlug(slug: string): Promise<Types.ObjectId> {
    const supplier = await this.supplierModel.findOne({ slug });

    if (!supplier) {
      throw new NotFoundException(`Supplier with slug "${slug}" is not exists`);
    }

    return supplier._id;
  }
  async findIdBySlugs(slugs: string[] | string): Promise<Types.ObjectId[]> {
    const slugArray = typeof slugs === 'string' ? [slugs] : slugs;
    let slugIds = [];

    for (const slug of slugArray) {
      const slugId = await this.findIdBySlug(slug);
      slugIds.push(slugId);
    }
    return slugIds;
  }
  async getTop3SuppliersByProductViews() {
    return await this.productModel.aggregate([
      {
        $match: {
          supplierId: { $exists: true },
        },
      },
      {
        $group: {
          _id: '$supplierId',
          totalViews: { $sum: '$views' },
          totalProducts: { $count: {} },
        },
      },
      {
        $sort: { totalViews: -1 },
      },
      {
        $lookup: {
          from: 'suppliers',
          localField: '_id',
          foreignField: '_id',
          as: 'supplier',
        },
      },
      { $unwind: '$supplier' },

      {
        $match: {
          'supplier.status': statusSupplier.ACTIVE,
        },
      },
      { $limit: 3 },
    ]);
  }
  async findByName(name: string) {
    this.supplierModel
      .find({
        name: { $regex: name, $options: 'i' },
      })
      .collation({ locale: 'vi', strength: 1 })
      .lean();
  }
  async update(
    _id: string,
    updateSupplierDto: UpdateSupplierDto,
    files: Express.Multer.File[],
  ) {
    const supplier = await this.supplierModel.findById(_id);
    if (!supplier) {
      throw new BadRequestException('Can not find supplier to update');
    }

    //Must have this to use synImage from cloudinaryService
    const keptImages = updateSupplierDto.existingImages
      ? JSON.parse(updateSupplierDto.existingImages)
      : [];
    const currentImages = supplier.images ?? [];

    const finalImages = await this.cloudinaryService.synImages(
      currentImages,
      keptImages,
      files,
    );

    supplier.images = finalImages;
    supplier.name = updateSupplierDto.name;
    supplier.status = updateSupplierDto.status ?? supplier.status;
    supplier.contactName =
      updateSupplierDto.contactName ?? supplier.contactName;
    supplier.slug = supplier.slug ?? supplier.slug;
    return await supplier.save();
  }
  async remove(_id: string) {
    const supplier = await this.supplierModel.findById(_id);
    if (!supplier) {
      throw new NotFoundException('Không tìm thấy supplier');
    }
    const id_image = supplier?.images.map((img) => img.public_id);
    await this.cloudinaryService.deleteFiles(id_image);
    return await this.supplierModel.deleteOne({ _id });
  }
}
