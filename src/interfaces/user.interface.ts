import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  businessName: string;
  email: string;
  contactNo: string;  
  password: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}