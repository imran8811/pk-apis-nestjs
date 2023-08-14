import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate } from "class-validator";

export class AdminUserDTO {
  @IsString()
  readonly fullName: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
}