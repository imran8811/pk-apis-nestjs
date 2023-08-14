import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class AddProductDTO {
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
  readonly articleNo: string;
  @IsString()
  readonly category: string;
  @IsString()
  readonly dept: string;
  @IsString()
  readonly slug: string;
}

export class UpdateProductDTO extends PartialType(AddProductDTO){

}