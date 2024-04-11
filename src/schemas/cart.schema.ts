import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongooseSchema, Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  
  @Prop({ type: String, required: true })
  productId: string;

  @Prop({ type: String, required: true })
  sessionType: string;

  @Prop({ type: Array, required: true })
  sizes: string[];

  @Prop({ type: Array, required: true })
  quantity: string[];
  
  @Prop({ type: String })
  instructions: string;

}

export const CartSchema = SchemaFactory.createForClass(Cart);