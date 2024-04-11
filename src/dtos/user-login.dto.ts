import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate, IsEmail } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class UserLoginDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}