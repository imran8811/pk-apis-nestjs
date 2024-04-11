import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps : true})
export class User {
  @Prop()
  fullName: string;
  @Prop()
  email: string;
  @Prop()
  contactNo: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);