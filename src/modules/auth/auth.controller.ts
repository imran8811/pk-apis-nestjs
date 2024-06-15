import { Controller, Get, Post, Res, Param, Body, HttpStatus, Delete, HttpException, UseGuards} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth.guard';
import { jwtConstants } from 'src/constants';
import { Public } from 'src/decorators/public.deco';
import { UserDTO, UserLoginDTO } from 'src/dtos';
import { AuthService } from 'src/services';

@Controller('auth')
export class AuthController {
  
  constructor(
    private authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
  async userRegister(@Res() response, @Body() userDTO: UserDTO) {
    const userRegister = await this.authService.userRegister(userDTO);
    if(userRegister != '444') {
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        data: userRegister
      })
    } else {
      throw new HttpException('User Already Exists', HttpStatus.UNAUTHORIZED);
    }
  }

  @Public()
  @Post('login')
  async userLogin(@Res() response, @Body() body) {
    try {
      const userLogin = await this.authService.userLogin(body.email, body.password);
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        data: userLogin
      })
    } catch(err){
      // console.log(err);
      // if(err === '445'){
        return response.status(HttpStatus.NOT_FOUND).json({
          type: 'error',
          message: 'Invalid Email/Password',
        })
      // }
    }
  }

  @Post('logout')
  async userLogout(@Res() response, @Body() body) {
    try {
      const userLogin = await this.authService.userLogout(body.userId);
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        data: userLogin
      })
    } catch(err){
      // console.log(err);
      // if(err === '445'){
        return response.status(HttpStatus.NOT_FOUND).json({
          type: 'error',
          message: 'Unable to logout user',
        })
      // }
    }
  }
}
