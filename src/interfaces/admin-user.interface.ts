import { Document } from "mongoose";

export interface IAdminUser extends Document {
  _id: string;
  token: string;
  joinedAt?: Date;
  createdAt?: Date;
  fullName: string;
  email: string;  
  password: string;  
  data?: string[];
}