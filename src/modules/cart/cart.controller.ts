import { Controller, Get, Post, Res, Param, Body, HttpStatus, Delete, Put} from '@nestjs/common';

import { ProductDTO, ProductFilterDTO } from 'src/dtos';
import { CartDTO } from 'src/dtos/product/cart.dto';
import { ProductImageDTO } from 'src/dtos/product/image.dto';
import { CartService } from 'src/services';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('getItems')
  async getAllItemsByUser(@Body() body, @Res() response){
    const res = this.cartService.getAllItemsByUser(body.userId)
    return res;
  }

  @Post('saveItem')
  async saveItem(@Body() cartDTO: CartDTO, @Res() response){
    try {
      const res = await this.cartService.saveItem(cartDTO);
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        message: 'Item added successfully',
        data: res
      })
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Item not added into cart!',
        error: err
      })
    }
  }
}
