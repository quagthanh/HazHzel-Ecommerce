import { statusProduct } from '@/shared/enums/statusProduct.enum';
import { GenderType } from '@/shared/enums/typeGenderProduct.enm';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { IImage } from '@/shared/interfaces/image';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, unique: true })
  slug: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' })
  supplierId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' })
  collectionId: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  views: number;

  @Prop({ type: [Object], default: [] })
  images: IImage[];

  @Prop({ type: String, enum: GenderType, default: GenderType.UNISEX })
  gender: GenderType;

  @Prop({
    type: String,
    enum: statusProduct,
    default: statusProduct.ACTIVE,
  })
  status: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isSale: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isHot: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isNewArrival: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
