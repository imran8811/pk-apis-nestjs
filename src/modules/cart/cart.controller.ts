import { Controller, Get, Post, Res, Param, Body, HttpStatus, Delete, Put, Query} from '@nestjs/common';
import { Public } from 'src/decorators/public.deco';

import { ProductDTO, ProductFilterDTO } from 'src/dtos';
import { CartDTO } from 'src/dtos/cart.dto';
import { ProductImageDTO } from 'src/dtos/image.dto';
import { CartService } from 'src/services';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Public()
  @Get('getAll')
  async getAllItemsByUser(@Query() queryParams){
    const res = this.cartService.getAllItemsByUser(queryParams.userId);
    return res;
  }

  @Public()
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
        errorCode: 960,
        message: 'Error: Item not added into cart!',
        error: err
      })
    }
  }


  @Public()
  @Delete(':id')
  async deleteCartItem(@Param() params, @Res() response){
    try {
      const res = await this.cartService.deleteCartItem(params.id);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: 'Item deleted successfully',
        data: res
      })
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        errorCode: 961,
        message: 'Error: Item not deleted from cart!',
        error: err
      })
    }
  }
}
