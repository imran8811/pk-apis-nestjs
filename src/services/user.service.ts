import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from 'src/interfaces';
import { UserLoginDTO } from 'src/dtos/';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
  ){}

  async userLogin(userLoginDTO: UserLoginDTO): Promise<IUser>{
    const userCreds = await new this.userModel(userLoginDTO);
    return userCreds;
  }
}
