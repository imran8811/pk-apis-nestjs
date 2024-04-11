import { Document } from "mongoose";

export interface ICart extends Document {
  productId;
  sessionType: string;
  sizes: string[];
  quantity: string[];
  instructions: string;
}