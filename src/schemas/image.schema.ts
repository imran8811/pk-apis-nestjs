import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductImagesDocument = ProductImages & Document;

@Schema({ timestamps: true })

export class ProductImages {
  @Prop({ type: String })
  articleNo: string;

  @Prop({ type: String })
  frontImgUrl: string;

  @Prop({ type: String })
  backImgUrl: string;

  @Prop({ type: String })
  other1ImgUrl: string;

  @Prop({ type: String })
  other2ImgUrl: string;

  @Prop({ type: String })
  other3ImgUrl: string;
}

export const ProductImageSchema = SchemaFactory.createForClass(ProductImages);