import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { UserAccountController } from './user-account.controller';
import { AuthService } from 'src/services';
import { User, UserSchema } from 'src/schemas';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { AuthGuard } from 'src/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserAccountService } from 'src/services/user-account.service';
import { UserAddress, UserAddressSchema } from 'src/schemas/user-address.schema';
import { RefreshToken, RefreshTokenSchema } from 'src/schemas/refresh-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: UserAddress.name,
        schema: UserAddressSchema
      },
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema
      }
    ]),
    JwtModule.registerAsync({
      useFactory : () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '7d' },
      })
    }),
  ],
  controllers: [AuthController, UserAccountController],
  providers: [
    AuthService,
    UserAccountService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
