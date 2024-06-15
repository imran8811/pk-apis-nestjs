import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps : true})
export class User {
  @Prop()
  businessName: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  contactNo: string;
  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);