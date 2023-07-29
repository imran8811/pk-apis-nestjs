import { Controller, Get } from '@nestjs/common';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('men/jeans-pants')
  getMenJeansPants(): string {
    return this.productsService.getMenJeansPants();
  }
}
