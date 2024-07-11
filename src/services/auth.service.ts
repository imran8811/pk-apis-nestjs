import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';

import { IUser } from 'src/interfaces';
import { UserDTO } from 'src/dtos/';
import { JwtService } from '@nestjs/jwt';
import { IRefreshToken } from 'src/interfaces/refresh-token.interface';
import { RESTRICTED_COUNTRIES } from 'src/constants';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('RefreshToken') private refreshToken: Model<IRefreshToken>,
    private jwtService: JwtService,
    private httpService: HttpService
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
    const userLogin = await this.userModel.findOne({email}).exec();
    const passwordMatch = await bcrypt.compare(password, userLogin.password);
    if(passwordMatch){
      const access_token = await this.jwtService.signAsync({sub: userLogin._id});
      const refreshToken = uuidv4();
      await this.saveRefreshToken(refreshToken, userLogin._id);
      return {
        token: access_token,
        refreshToken,
        businessName: userLogin.businessName,
        contactNo: userLogin.contactNo,
        userId: userLogin._id,
      };
    } else {
      throw new Error('445')
    }
  }

  async generateRefreshToken(userId:string){
    const access_token = await this.jwtService.signAsync({sub: userId});
    const refreshToken = uuidv4();
    const res = await this.saveRefreshToken(refreshToken, userId);
    return {
      access_token,
      refreshToken
    };
  }

  async saveRefreshToken(refreshToken:string, userId:string){
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate()+3);
    const createRefreshToken =  await this.refreshToken.create({refreshToken, userId, expiryDate});
    return createRefreshToken;
  }

  async getRefreshToken(refreshToken:string){
    const verifyRefreshToken = this.refreshToken.findOneAndDelete({
      refreshToken,
      expiryDate: { $gte : new Date() }
    })
    if(verifyRefreshToken){
      // return this.generateRefreshToken(verifyRefreshToken.userId)
    }
  }

  async checkUserCountry(){
    const url = 'http://ip-api.com/json/';
    const { data } = await firstValueFrom(this.httpService.get(url));
    return RESTRICTED_COUNTRIES.includes(data.countryCode)? false : true;
  }

  async userLogout(userId:string, token:string): Promise<any>{
    const decoded = this.jwtService.verify(token.split(' ')[1], {'secret': 'lkdjfldkjfklsd0980980f9sd8f0sd98f0s9d8f//$$$098098'});
    if(decoded.sub) {
      const userExists = await this.userModel.findOne({
        _id: userId
      }).exec();
      // return decoded.sub + userExists._id;
      return userExists._id === decoded.sub? true : false; 
    }
  }
}
