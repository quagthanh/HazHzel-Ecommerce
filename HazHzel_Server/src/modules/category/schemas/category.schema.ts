import { statusCategory } from '@/shared/enums/statusCategory.enum';
import { IImage } from '@/shared/interfaces/image';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  slug: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  })
  parentCategory: Types.ObjectId;

  @Prop({ type: String, enum: statusCategory, default: 'ACTIVE' })
  status: string;

  @Prop({ type: [Object], default: [] })
  images: IImage[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
