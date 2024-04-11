import { Controller, Get, Post, Res, Param, Body, HttpStatus, Delete} from '@nestjs/common';
import { UserRegisterDTO, UserLoginDTO } from 'src/dtos';
import { UserService } from 'src/services';

@Controller('user')
export class UserController {
  
  constructor(private userService: UserService) {}

  @Post('login')
  async userLogin(@Res() response, @Body() userLoginDTO: UserLoginDTO) {
    try {
      const userLogin = await this.userService.userLogin(userLoginDTO);
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        data: userLogin
      })
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        error: 'Bad Request'
      })
    }
  }
}
