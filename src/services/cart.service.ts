import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CartDTO } from 'src/dtos';
import { ICart } from 'src/interfaces';
import { Cart } from 'src/schemas';

@Injectable()
export class CartService {

  constructor(
    @InjectModel(Cart.name) private cartModel: Model<ICart>,
  ){}

  getAllItemsByUser(userId: string){
    const getCartItems = this.cartModel.find({
      userId
    })
    .populate('productDetails')
    .exec();
    return getCartItems;
  }

  async saveItem (cartDTO: CartDTO): Promise<any> {
    const itemAlreadyExists = await this.itemAlreadyExists(cartDTO.productId);
    if(itemAlreadyExists) {
      const res =  this.cartModel.updateOne({
        productId: cartDTO.productId,
      }, 
      {
        quantity: cartDTO.quantity,
        sizes: cartDTO.sizes,
        instructions: cartDTO.instructions,
        amount: cartDTO.amount
      });
      return res;
    } else {
      const saveItem = new this.cartModel(cartDTO);
      const res = await saveItem.save();
      const res2 = this.cartModel.updateOne({
        _id: res._id
      }, {
        $push :{
          productDetails : cartDTO.productId
        }
      }, {
        upsert: false, 
        new: true
      })
      return res2;
    }
  }
  
  async itemAlreadyExists (productId:string): Promise<boolean> {
    return this.cartModel.findOne({
      productId
    }).then(item => {
      if (item) return true;
      return false;
    });
  }

  async deleteCartItem (productId:string): Promise<any> {
    return this.cartModel.deleteOne({
      productId
    }).exec()
  }

  async deleteCartItemByUserId (userId:string): Promise<any> {
    return this.cartModel.deleteOne({
      userId
    }).exec()
  }
  
}
