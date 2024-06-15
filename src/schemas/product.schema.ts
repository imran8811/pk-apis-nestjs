import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductImages } from './image.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {

  @Prop({ type: Array, ref: 'ProductImages', required: true })
  productImages: ProductImages;

  @Prop({ type: String, required: true })
  articleNo: string;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: String, required: true })
  fitting: string;

  @Prop({ type: String, required: true })
  sizes: string;

  @Prop({ type: String, required: true })
  fabric: string;

  @Prop({ type: String, required: true })
  washType: string;

  @Prop({ type: String, required: true })
  moq: string;

  @Prop({ type: String, required: true })
  slug: string;

  @Prop({ type: String, required: true })
  fabricWeight: string;

  @Prop({ type: String, required: true })
  price: string;

  @Prop({ type: String, required: true })
  dept: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: String, required: true })
  length: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);