import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductsDocument = HydratedDocument<Products>;

@Schema()
export class Products {
  @Prop()
  sizes: string;
  @Prop()
  colors: string;
  @Prop()
  fitting: string;
  @Prop()
  fabric: string;
  @Prop()
  fabricWeight: string;
  @Prop()
  washType: string;
  @Prop()
  moq: string;
  @Prop()
  price: string;
  @Prop()
  articleNo: string;
  @Prop()
  category: string;
  @Prop()
  type: string;
  @Prop()
  length: string;
  @Prop()
  slug: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);