import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from '../../services/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { ProductImages, ProductImageSchema } from 'src/schemas/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      },
      {
        name: ProductImages.name,
        schema: ProductImageSchema
      }
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
