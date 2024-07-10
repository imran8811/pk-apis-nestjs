import { Document } from "mongoose";

export interface IRefreshToken extends Document {
  _id: string;
  refreshToken: string;
  userId: string;
  expiryDate: Date;
}