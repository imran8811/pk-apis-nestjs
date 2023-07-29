import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../services/products.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProdutsModule {}
