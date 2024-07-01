import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUser } from 'src/interfaces';
import { UserDTO } from 'src/dtos/';
import { JwtService } from '@nestjs/jwt';
import { IUserAddress } from 'src/interfaces/user-address.interface';
import { UserAddressDTO } from 'src/dtos/auth/user-address.dto';

@Injectable()
export class UserAccountService {

  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('UserAddress') private userAddressModel: Model<IUserAddress>,
  ){}

  async getUserAccount(id:string): Promise<any>{
    const userLogin = await this.userModel.findOne({
      _id: id
    }).exec();
    
    return {
      businessName: userLogin.businessName,
      email: userLogin.email,
      contactNo: userLogin.contactNo,
      createdAt: userLogin.createdAt
    };
  }

  async getUserAddresses(id:string): Promise<any>{
    const userAddresses = await this.userAddressModel.find({
      userId: id
    }).exec();
    return userAddresses;
  }

  async getUserAddressById(id:string): Promise<any>{
    const userAddress = await this.userAddressModel.find({
      _id: id
    }).exec();
    return userAddress;
  }

  async createUserAddress(userAddressDTO : UserAddressDTO): Promise<IUserAddress>{
    const newUserAddress = new this.userAddressModel(userAddressDTO);
    return newUserAddress.save();
  }

  async updateUserAddress(userId: string, data:IUserAddress): Promise<IUserAddress>{
    let filter = { _id: data.addressId, userId }
    let update = data;
    const updateUserAddress = await this.userAddressModel.findOneAndUpdate(filter, update, {new: true});
    return updateUserAddress;
  }

  async deleteUserAddress(userId:string, addressId:string){
    return await this.userAddressModel.deleteOne({
      _id: addressId,
      userId, 
    }).exec();
  }
}
