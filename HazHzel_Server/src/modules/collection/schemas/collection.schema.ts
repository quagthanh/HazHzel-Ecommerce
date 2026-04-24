import { statusCollection } from '@/shared/enums/statusCollection.enum';
import { IImage } from '@/shared/interfaces/image';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema({ timestamps: true })
export class Collection {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ type: [Object], default: [] })
  images: IImage[];

  @Prop({
    type: String,
    enum: statusCollection,
    default: statusCollection.ACTIVE,
  })
  status: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
