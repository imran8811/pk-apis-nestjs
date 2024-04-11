import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartService } from '../../services';
import { CartController } from './cart.controller';
import { CartSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "cart",
        schema: CartSchema
      }
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
