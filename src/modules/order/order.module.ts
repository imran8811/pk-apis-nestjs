import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartService, OrderService } from '../../services';
import { OrderController } from './order.controller';
import { Cart, CartSchema, Order, OrderSchema } from 'src/schemas';
import { CartController } from '../cart/cart.controller';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      },
      {
        name: Cart.name,
        schema: CartSchema
      }
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService, CartService],
})
export class OrderModule {}
