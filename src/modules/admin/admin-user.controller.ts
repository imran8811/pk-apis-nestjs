import { Controller, Get, Post, Res, Req, Body, HttpStatus } from '@nestjs/common';
import { AdminUserDTO } from 'src/dtos/admin/admin-user.dto';
import { AdminService } from 'src/services/admin-user.service';
import * as bcrypt from 'bcrypt';
import { IAdminUser } from 'src/interfaces/admin-user.interface';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('create')
  async createAdmin(@Body() reqData: any, @Res() response) {
    try {
      const saltOrRound = 10;
      const data = {
        fullName : reqData.fullName,
        email: reqData.email,
        password: await bcrypt.hash(reqData.password, saltOrRound)
      }
      const res = await this.adminService.create(data)
      return response.status(HttpStatus.CREATED).json({
        type: 'success',
        message: 'New Admin user created',
        data: {
          email: res[0].email,
          fullName: res[0].fullName
        }
      })
    } catch(err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
        err: err
      })
    }
  }

  @Post('login')
  async adminLogin(@Body() reqData: any, @Res() response) {
    try {
      const saltOrRounds = 10;
      let hasedPassword;
      const adminUser = this.adminService.getAdmin(reqData.email).then(res => res);
      // const passwordMatch = await bcrypt.compare(reqData.password, hasedPassword);
      // if(passwordMatch){
        return response.status(HttpStatus.CREATED).json({
          type: 'success',
          message: 'Signed in successfully',
          token: 'sdfsdfsdfsdfsfd',
          data: adminUser
        })

      // }
      // const data = {
      //   email: reqData.email,
      //   password:  
      // }
      // const adminLogin = this.adminService.login(data);
      // adminLogin.then((res:any) => {
      //   return response.status(HttpStatus.FOUND).json({
      //     type: 'success',
      //     message: 'Signed in successfully',
      //     token: 'sdfsdfsdfsdfsfd',
      //     data: {
      //       fullName: res[0].fullName
      //     }
      //   })
      // })
    } catch(err){
      console.log(err)
    }
  }
}
