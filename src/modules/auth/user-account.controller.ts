import { Controller, Get, Post, Res, Param, Body, HttpStatus, Query, Delete, HttpException, UseGuards, Put} from '@nestjs/common';
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

  @Get('user-address-by-id/:id')
  async getUserAddressById(@Res() response, @Param() param) {
    const userAddress = await this.userAccountService.getUserAddressById(param.id);
    if(userAddress) {
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        data: userAddress
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

  @Put('user-address')
  async updateUserAddress(@Res() response, @Body() body) {
    try {
      const updateUserAddress = await this.userAccountService.updateUserAddress(body.userId, body);
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        message: 'User address updated successfully',
        data: updateUserAddress
      })
    } catch(err){
      return response.status(HttpStatus.NOT_FOUND).json({
        type: 'error',
        message: 'Unable to update user address',
      })
    }
  }

  @Delete('user-address-by-id/:userId/:addressId')
  async deleteUserAddressById(@Res() response, @Param() param) {
    try {
      const deleteUserAddress = await this.userAccountService.deleteUserAddress(param.userId, param.addressId);
      return response.status(HttpStatus.OK).json({
        type: 'success',
        message: "Adress has been deleted successfully"
      })
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Unable to delete address!',
        error: 'Bad Request'
      })
    }
  }
}
