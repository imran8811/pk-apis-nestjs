import { IsNotEmpty, IsString, IsNumber, MaxLength, IsDate, IsOptional, IsEmail } from "class-validator";

export class UserAddressDTO {
  @IsString()
  userId: string;
  @IsString()
  country: string;
  @IsString()
  state: string;
  @IsString()
  city: string;
  @IsString()
  area: string;
  @IsString()
  postalCode: string;
  @IsString()
  addressType: string;
}