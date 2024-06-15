import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate, IsArray } from "class-validator";
import { Product } from "src/schemas";

export class CartDTO {
  @IsString()
  productId: string;
  @IsString()
  userId: string;
  @IsArray()
  sizes: string[];
  @IsArray()
  quantity: string[];
  @IsString()
  instructions: string;
  @IsNumber()
  amount: number;
  productDetails?: Product
}