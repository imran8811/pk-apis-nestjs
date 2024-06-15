import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate, IsArray } from "class-validator";
import { Product } from "src/schemas";

export class OrderDTO {
  @IsArray()
  items: object[];
  @IsString()
  shippingAddress: string;
  @IsString()
  orderAmount: string;
  @IsString()
  userId: string;
}