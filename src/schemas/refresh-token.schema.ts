import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type refreshTokenDocument = HydratedDocument<RefreshToken>;

@Schema({timestamps : true})
export class RefreshToken {
  @Prop({required : true})
  refreshToken: string;
  @Prop({ required: true })
  userId: string;
  @Prop()
  expiryDate: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);