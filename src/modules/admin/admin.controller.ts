import { Controller, Get, Post, Res, Req, Body, HttpStatus } from '@nestjs/common';
import { AdminService } from 'src/services/admin.service';
import { Public } from 'src/decorators/public.deco';
import { AdminDTO } from 'src/dtos';

@Controller('admin')
export class AdminController {

  constructor(private adminService: AdminService) {}

  @Public()
  @Post('create')
  async createAdmin(@Body() adminDTO: AdminDTO, @Res() response) {
    try {
      const res = await this.adminService.createAdminUser(adminDTO)
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        message: 'New Admin user created',
        data: res
      })
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: err.message,
        error: 'Bad Request',
        err: err
      })
    }
  }

  @Public()
  @Post('login')
  async adminUserLogin(@Res() response, @Body() body){
    try {
      const adminUserLogin = await this.adminService.adminUserLogin(body.email, body.password);
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        data: adminUserLogin
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

  @Public()
  @Post('logout')
  async userLogout(@Res() response, @Body() body) {
    try {
      const userLogin = await this.adminService.adminLogout(body.userId);
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
