import { IsArray } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class ProductFilterDTO {
  @IsArray()
  readonly dept: string[];
  @IsArray()
  readonly category: string[];
  @IsArray()
  readonly fitting: string[];
  @IsArray()
  readonly color: string[];
  @IsArray()
  readonly washType: string[];
}