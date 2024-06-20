import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({timestamps: true})
export class Admin {
  @Prop()
  readonly fullName: string;
  @Prop({ unique: true })
  readonly email: string;
  @Prop()
  readonly password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);