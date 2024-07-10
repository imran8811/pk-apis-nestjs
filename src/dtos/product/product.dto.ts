import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate, IsArray, IsOptional } from "class-validator";

export class ProductDTO {
  @IsOptional()
  readonly _id: string;
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
  @IsString()
  readonly pieceWeight: string;
  @IsArray()
  @IsOptional()
  readonly productImages?: string[];
}