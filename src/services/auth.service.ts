import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUser } from 'src/interfaces';
import { UserDTO } from 'src/dtos/';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    private jwtService: JwtService
  ){}

  async userRegister(userDTO: UserDTO): Promise<any>{
    const checkUserExists = await this.userExists(userDTO.email)
    if(!checkUserExists){
      const saltOrRounds = 10;
      const password = userDTO.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      userDTO.password = hash
      const registerUser =  new this.userModel(userDTO);
      const res = await registerUser.save();
      const access_token = await this.jwtService.signAsync({sub: res._id, username: res.email});
      return {
        token: access_token,
        businessName: res.businessName,
        contactNo: res.contactNo,
        userId: res._id
      };
    } else {
      return '444'
    }
  }

  async userExists(email:string): Promise<boolean>{
    const findUser = await this.userModel.findOne({
      email
    }).exec()
    if(findUser)
      return true
    return false;
  }

  async userLogin(email:string, password:string): Promise<any>{
    const userLogin = await this.userModel.findOne({
      email
    }).exec();
    const passwordMatch = await bcrypt.compare(password, userLogin.password)
    if(passwordMatch){
      const access_token = await this.jwtService.signAsync({sub: userLogin._id, username: userLogin.email});
      return {
        token: access_token,
        businessName: userLogin.businessName,
        contactNo: userLogin.contactNo,
        userId: userLogin._id
      };
    } else {
      throw new Error('445')
    }
  }

  async userLogout(userId:string): Promise<any>{
    const userExists = await this.userModel.findOne({
      _id: userId
    }).exec();
    return userExists? true : false; 
  }
}
