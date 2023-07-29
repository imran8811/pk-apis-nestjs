import { Document } from "mongoose";

export interface IProduct extends Document {
  readonly sizes: string;
  readonly colors: string;
  readonly fitting: string;  
  readonly fabric: string;  
  readonly fabricWeight: string;
  readonly washType: string;
  readonly moq: string;
  readonly price: string;
  readonly articleNo: string;
  readonly category: string;
  readonly type: string;
  readonly length: string;
  readonly slug: string;
}