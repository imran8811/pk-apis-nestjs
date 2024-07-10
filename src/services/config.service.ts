import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { IUser } from 'src/interfaces';
import { UserDTO } from 'src/dtos/';
import { JwtService } from '@nestjs/jwt';
import { IRefreshToken } from 'src/interfaces/refresh-token.interface';

@Injectable()
export class ConfigService {
  // private readonly envConfig: EnvConfig;

  // constructor() {
  //   this.envConfig = dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV}.env`));
  // }

  // get databaseHost(): string {
  //   return this.envConfig.DATABASE_HOST;
  // }
  
}
