import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  sizes: string;
  @Prop()
  color: string;
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
  dept: string;
  @Prop()
  category: string;
  @Prop()
  length: string;
  @Prop()
  slug: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);