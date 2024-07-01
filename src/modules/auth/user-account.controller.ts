import { Controller, Get, Post, Res, Param, Body, HttpStatus, Delete, HttpException, UseGuards} from '@nestjs/common';
import { Public } from 'src/decorators/public.deco';
import { UserDTO } from 'src/dtos';
import { UserAddressDTO } from 'src/dtos/auth/user-address.dto';
import { UserAccountService } from 'src/services/user-account.service';

@Controller('user-account')
export class UserAccountController {
  
  constructor(
    private userAccountService: UserAccountService,
  ) {}

  @Get(':id')
  async getUserAccount(@Res() response, @Param() param) {
    const userAccount = await this.userAccountService.getUserAccount(param.id);
    if(userAccount) {
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        data: userAccount
      })
    } else {
      throw new HttpException('User Not Found', HttpStatus.NO_CONTENT);
    }
  }

  @Get('user-address/:id')
  async getUserAddresses(@Res() response, @Param() param) {
    const userAddresses = await this.userAccountService.getUserAddresses(param.id);
    if(userAddresses) {
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        data: userAddresses
      })
    } else {
      throw new HttpException('User Not Found', HttpStatus.NO_CONTENT);
    }
  }

  @Post('user-address')
  async createUserAddress(@Res() response, @Body() userAddress: UserAddressDTO) {
    try {
      const createUserAddress = await this.userAccountService.createUserAddress(userAddress);
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        message: 'User address added successfully',
        data: createUserAddress
      })
    } catch(err){
      return response.status(HttpStatus.NOT_FOUND).json({
        type: 'error',
        message: 'Unable to add user address',
      })
    }
  }

  // @Post('logout')
  // async userLogout(@Res() response, @Body() body) {
  //   try {
  //     const userLogin = await this.authService.userLogout(body.userId);
  //     return response.status(HttpStatus.CREATED).json({
  //       type: 'success',
  //       data: userLogin
  //     })
  //   } catch(err){
  //     // console.log(err);
  //     // if(err === '445'){
  //       return response.status(HttpStatus.NOT_FOUND).json({
  //         type: 'error',
  //         message: 'Unable to logout user',
  //       })
  //     // }
  //   }
  // }
}
