import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartDTO } from 'src/dtos/product/cart.dto';

import { ICart } from 'src/interfaces';

@Injectable()
export class CartService {

  constructor(
    @InjectModel('cart') private cartModel: Model<ICart>,
  ){}

  getAllItemsByUser(userId: string){
    const getCartItems = this.cartModel.find({
      userId
    })
    .exec();
    return getCartItems;
  }

  async saveItem (cartDTO: CartDTO): Promise<ICart> {
    const saveItem = new this.cartModel(cartDTO);
    return saveItem.save();
  }

  

}
