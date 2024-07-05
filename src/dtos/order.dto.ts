import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate, IsArray, IsOptional } from "class-validator";
import { Product } from "src/schemas";

export class OrderDTO {
  @IsNumber()
  orderId: number;
  @IsArray()
  items: object[];
  @IsString()
  shippingAddressId: string;
  @IsNumber()
  totalAmount: number;
  @IsNumber()
  totalQuantity: number;
  @IsString()
  userId: string;
  @IsString()
  status: string;
}