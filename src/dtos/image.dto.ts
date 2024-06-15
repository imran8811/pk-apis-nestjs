import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate } from "class-validator";

export class ProductImageDTO {
  @IsString()
  articleNo: string;
  @IsString()
  frontImgUrl: string;
  @IsString()
  backImgUrl: string;
  @IsString()
  other1ImgUrl: string;
  @IsString()
  other2ImgUrl: string;
  @IsString()
  other3ImgUrl: string;
}