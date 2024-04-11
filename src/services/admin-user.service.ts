import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAdminUser } from 'src/interfaces/admin-user.interface';

@Injectable()
export class AdminService {

  constructor(@InjectModel('admin_user') private adminUserModel: Model<IAdminUser>){}

  async create(data): Promise<IAdminUser>{
    const newAdminUser = await new this.adminUserModel(data);
    return newAdminUser.save();
  }

  login(data){
    return this.adminUserModel.find({
      email: data.email,
      password: data.password
    }).exec();
  }

  getAdmin = async (email:string) => {
    return await this.adminUserModel.find({email : email}).exec();
  }
}
