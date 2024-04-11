import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate, IsArray } from "class-validator";

export class CartDTO {
  @IsString()
  readonly productId: string;
  @IsString()
  readonly sessionType: string;
  @IsArray()
  readonly sizes: string[];
  @IsArray()
  readonly quantity: string[];
  @IsString()
  readonly instructions: string;
}