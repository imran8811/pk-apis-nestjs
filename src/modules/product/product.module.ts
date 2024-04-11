import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from '../../services/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductInfoSchema } from 'src/schemas/product.schema';
import { ProductImageSchema } from 'src/schemas/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "product",
        schema: ProductInfoSchema
      },
      {
        name: "productimage",
        schema: ProductImageSchema
      }
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
