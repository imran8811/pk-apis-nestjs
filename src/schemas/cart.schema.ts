import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from './product.schema';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  
  @Prop({ type: String, required: true })
  productId: string;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: Array, required: true })
  sizes: string[];

  @Prop({ type: Array, required: true })
  quantity: string[];
  
  @Prop({ type: String })
  instructions: string;
  
  @Prop({ type: Number, required : true})
  amount: number;

  @Prop({ type: Array, ref: 'Product' })
  productDetails: Product;

}

export const CartSchema = SchemaFactory.createForClass(Cart);
