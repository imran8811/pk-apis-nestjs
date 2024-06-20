import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAdminUser } from 'src/interfaces/admin-user.interface';
import * as bcrypt from 'bcrypt';
import { AdminDTO } from 'src/dtos';

@Injectable()
export class AdminService {

  constructor(
    @InjectModel('Admin') private adminUserModel: Model<IAdminUser>,
    private jwtService: JwtService
  ){}

  async createAdminUser(adminDTO: AdminDTO): Promise<any>{
    const saltOrRounds = 10;
    const password = adminDTO.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    adminDTO.password = hash;
    const registerUser =  new this.adminUserModel(adminDTO);
    const res = await registerUser.save();
    const access_token = await this.jwtService.signAsync({sub: res._id, username: res.email});
    return {
      token: access_token,
    };
  }

  async adminUserLogin(email:string, password:string): Promise<any>{
    const userLogin = await this.adminUserModel.findOne({
      email
    }).exec();
    const passwordMatch = await bcrypt.compare(password, userLogin.password)
    if(passwordMatch){
      const access_token = await this.jwtService.signAsync({sub: userLogin._id, username: userLogin.email});
      return {
        token: access_token,
      };
    } else {
      throw new Error('445')
    }
  }

  getAdmin = async (email:string) => {
    return await this.adminUserModel.find({email : email}).exec();
  }

  async adminLogout(userId:string): Promise<any>{
    const userExists = await this.adminUserModel.findOne({
      _id: userId
    }).exec();
    return userExists? true : false; 
  }
}
