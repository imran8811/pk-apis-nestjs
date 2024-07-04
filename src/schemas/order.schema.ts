import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from './product.schema';
import { UserAddress } from './user-address.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })

export class Order {
  @Prop({ required: true, type: Number })
  orderId: number;

  @Prop({ required: true, type: Array })
  items: object[];

  @Prop({ required: true, type: String })
  shippingAddressId: string;

  @Prop({ required: true, type: String })
  totalAmount: string;
  
  @Prop({ required: true, type: String })
  totalQuantity: string;
  
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ type: Array, ref: 'Product' })
  productDetails: Product;
}

export const OrderSchema = SchemaFactory.createForClass(Order);