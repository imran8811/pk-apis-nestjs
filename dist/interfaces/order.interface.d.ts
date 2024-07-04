import { Document } from "mongoose";
export interface IOrder extends Document {
    orderId: number;
    items: object[];
    shippingAddressId: string;
    totalAmount: number;
    totalQuantity: number;
    userId: string;
    shippingAddress: [];
}
