import { Document } from "mongoose";

export interface IUser extends Document {
  readonly fullName: string;
  readonly email: string;
  readonly contactNo: string;  
  readonly password: string;
}