import mongoose, { Document } from 'mongoose';
import { Product } from './product.schema';
export type CartDocument = Cart & Document;
export declare class Cart {
    productId: string;
    userId: string;
    sizes: string[];
    quantity: string[];
    instructions: string;
    amount: number;
    productDetails: Product;
}
export declare const CartSchema: mongoose.Schema<Cart, mongoose.Model<Cart, any, any, any, mongoose.Document<unknown, any, Cart> & Cart & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Cart, mongoose.Document<unknown, {}, Cart> & Cart & {
    _id: mongoose.Types.ObjectId;
}>;
