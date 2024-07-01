import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserAddress>;

@Schema({timestamps : true})
export class UserAddress {
  @Prop()
  userId: string;
  @Prop()
  country: string;
  @Prop()
  state: string;
  @Prop()
  city: string;
  @Prop()
  area: string;
  @Prop()
  postalCode: string;
  @Prop()
  addressType: string;
}

export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);