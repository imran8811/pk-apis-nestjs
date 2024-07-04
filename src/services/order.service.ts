import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDTO } from 'src/dtos';
import { IOrder, ICart } from 'src/interfaces';
import { IUserAddress } from 'src/interfaces/user-address.interface';
import { Cart, Order, UserAddress } from 'src/schemas';
import { UserAccountService } from './user-account.service';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name) private orderModel: Model<IOrder>,
    @InjectModel(Cart.name) private cartModel: Model<ICart>,
    private userAccountService: UserAccountService,
  ){}

  getAllOrdersByUser(userId: string){
    const getOrders = this.orderModel.find({
      userId
    })
    .exec();
    return getOrders;
  }

  async createOrder (orderDTO: OrderDTO): Promise<any> {
    const saveItem = new this.orderModel(orderDTO);
    const res = await saveItem.save();
    return res;
  }

  async generateOrderId() {
    const res = await this.orderModel.findOne().sort({'createdAt' : -1}).exec();
    return res? res.orderId : '165566';
  }

  async getShippingAddressById(shippingAddressId) {
    const res = await this.userAccountService.getUserAddressById(shippingAddressId)
    return res;
  }

  async deleteCartItemByUserId (userId:string): Promise<any> {
    return this.cartModel.deleteOne({
      userId
    }).exec()
  }

}
