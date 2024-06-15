import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDTO } from 'src/dtos';
import { IOrder, ICart } from 'src/interfaces';
import { Cart, Order } from 'src/schemas';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<IOrder>,
    @InjectModel(Cart.name) private cartModel: Model<ICart>,
  ){}

  getAllOrdersByUser(userId: string){
    const getOrders = this.orderModel.find({
      userId
    })
    .populate('productDetails')
    .exec();
    return getOrders;
  }

  async createOrder (orderDTO: OrderDTO): Promise<any> {
    const saveItem = new this.orderModel(orderDTO);
    const res = await saveItem.save();
    return res;
  }
  
  // async itemAlreadyExists (productId:string): Promise<boolean> {
  //   return this.cartModel.findOne({
  //     productId
  //   }).then(item => {
  //     if (item) return true;
  //     return false;
  //   });
  // }

  // async deleteCartItem (productId:string): Promise<any> {
  //   return this.cartModel.deleteOne({
  //     productId
  //   }).exec()
  // }

  async deleteCartItemByUserId (userId:string): Promise<any> {
    return this.cartModel.deleteOne({
      userId
    }).exec()
  }

}
