import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './auth.controller';
import { UserService } from 'src/services';
import { UserSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema
      }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AuthModule {}
