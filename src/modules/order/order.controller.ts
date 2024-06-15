import { Controller, Get, Post, Res, Param, Body, HttpStatus, Delete, Put, Query, UseGuards} from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

import { OrderDTO } from 'src/dtos';
import { CartService, OrderService } from 'src/services';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService, private cartService: CartService) {}

  @Get('getAll')
  async getAllOrdersByUser(@Query() queryParams){
    const res = this.orderService.getAllOrdersByUser(queryParams.userId);
    return res;
  }

  @Post('new')
  async createOrder(@Body() orderDTO: OrderDTO, @Res() response){
    try {
      const deleteCartItem = this.deleteCartItemByUserId(orderDTO.userId)
      if(deleteCartItem){
        const res = await this.orderService.createOrder(orderDTO);
        return response.status(HttpStatus.CREATED).json({
          type: 'success',
          message: 'Order Placed successfully',
          data: res
        })
      } else {
        return response.status(HttpStatus.BAD_REQUEST).json({
          errorCode: 966,
          message: 'Unable to remove cart Items',
        })
      }
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        errorCode: 965,
        message: 'Order not placed, try again',
        error: err
      })
    }
  }

  async deleteCartItemByUserId(userId: string){
    const res = await this.cartService.deleteCartItemByUserId(userId);
    return res? true: false;  
  }
}
