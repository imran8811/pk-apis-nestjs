import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class UserRegisterDTO {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly contactNo: string;
  @IsString()
  readonly password: string;
}