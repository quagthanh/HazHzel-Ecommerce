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
import aqp from 'api-query-params';
import { statusSupplier } from '@/shared/enums/statusSupplier.enum';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name) private readonly supplierModel: Model<Supplier>,
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

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
      throw new BadRequestException('Please choose atleast 1 picture');
    }
    const uploadedImages = await this.cloudinaryService.uploadMultiFiles(files);
    const simplifiedImages = uploadedImages.map((img) => ({
      public_id: img.public_id,
      secure_url: img.secure_url,
      width: img.width,
      height: img.height,
    }));

    const newSupplier = await this.supplierModel.create({
      name,
      images: simplifiedImages,
      slug,
      ...otherFields,
    });

    return newSupplier;
  }
  async findAll(query: string, current: number = 1, pageSize: number = 5) {
    const { filter, sort } = aqp(query);
    if (!current) current = 1;
    if (!pageSize) pageSize = 5;

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    const totalItems = await this.supplierModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);

    const result = await this.supplierModel.find(filter).sort(sort as any);
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
    const supplier = await this.supplierModel
      .findOne({ slug })
      .select('_id')
      .exec();

    if (!supplier) {
      throw new NotFoundException(`Supplier với slug "${slug}" không tồn tại.`);
    }

    return supplier._id;
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
    if (!isValidId(_id)) {
      throw new BadRequestException('Supplier Id is not valid');
    }

    const data = await this.supplierModel.findById(_id);
    if (!data) {
      throw new BadRequestException('Supplier have not been created yet');
    }

    let existingImages = data.images;

    if (files && files.length > 0) {
      const uploadedImages =
        await this.cloudinaryService.uploadMultiFiles(files);
      const newImages = uploadedImages.map((img) => ({
        public_id: img.public_id,
        secure_url: img.secure_url,
        width: img.width,
        height: img.height,
      }));
      existingImages = [...existingImages, ...newImages];
    }

    const result = await this.supplierModel.updateOne(
      { _id },
      { images: existingImages, ...updateSupplierDto },
    );

    return result;
  }
  async remove(_id: string) {
    if (!isValidId(_id)) {
      throw new BadRequestException('Id supplier không hợp lệ');
    }

    const supplier = await this.supplierModel.findById(_id);
    if (!supplier) {
      throw new NotFoundException('Không tìm thấy supplier');
    }

    return await this.supplierModel.deleteOne({ _id });
  }
}
