import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate } from "class-validator";

export class AdminDTO {
  @IsString()
  fullName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
}