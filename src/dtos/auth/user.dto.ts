import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate, IsOptional, IsEmail } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class UserDTO {
  @IsString()
  @IsOptional()
  _id: string;
  @IsString()
  businessName: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  contactNo: string;
  @IsString()
  @IsOptional()
  token: string;
}