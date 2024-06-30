import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUser } from 'src/interfaces';
import { UserDTO } from 'src/dtos/';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAccountService {

  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    private jwtService: JwtService
  ){}

  async getUserAccount(id:string): Promise<any>{
    const userLogin = await this.userModel.findOne({
      id
    }).exec();
    if(userLogin){
      return userLogin
    } else {
      throw new Error('User Not Found');
    }
  }
}
