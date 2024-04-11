import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate, IsArray } from "class-validator";

export class ProductDTO {
  @IsString()
  readonly articleNo: string;
  @IsString()
  readonly sizes: string;
  @IsString()
  readonly color: string;
  @IsString()
  readonly fitting: string;
  @IsString()
  readonly fabric: string;
  @IsString()
  readonly fabricWeight: string;
  @IsString()
  readonly washType: string;
  @IsString()
  readonly moq: string;
  @IsString()
  readonly price: string;
  @IsString()
  readonly category: string;
  @IsString()
  readonly dept: string;
  @IsString()
  readonly slug: string;
  @IsString()
  readonly length: string;
  @IsArray()
  readonly productImages: string[];
}