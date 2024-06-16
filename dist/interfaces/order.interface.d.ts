import { Document } from "mongoose";
export interface IOrder extends Document {
    items: object[];
    shippingAddress: string;
    orderAmount: string;
    userId: string;
}
