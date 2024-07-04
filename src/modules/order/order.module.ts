import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartService, OrderService } from '../../services';
import { OrderController } from './order.controller';
import { Cart, CartSchema, Order, OrderSchema, UserAddress, UserAddressSchema, User, UserSchema } from 'src/schemas';
import { UserAccountService } from 'src/services/user-account.service';
import { UserAccountController } from '../auth/user-account.controller';

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
      },
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: UserAddress.name,
        schema: UserAddressSchema
      }
    ]),
    
  ],
  controllers: [OrderController],
  providers: [OrderService, CartService, UserAccountService],
})
export class OrderModule {}
