import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from './product.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })

export class Order {
  @Prop({ type: Array })
  items: object[];

  @Prop({ type: String })
  shippingAddress: string;

  @Prop({ type: String })
  orderAmount: string;
  
  @Prop({ type: String })
  userId: string;

  @Prop({ type: Array, ref: 'Product' })
  productDetails: Product;

}

export const OrderSchema = SchemaFactory.createForClass(Order);