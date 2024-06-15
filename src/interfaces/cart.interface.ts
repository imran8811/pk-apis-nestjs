import { Document } from "mongoose";

export interface ICart extends Document {
  productId: string;
  userId: string;
  sizes: string[];
  quantity: string[];
  instructions: string;
  amount: number;
}