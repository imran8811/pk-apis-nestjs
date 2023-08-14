import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin-user.controller';
import { AdminSchema } from 'src/schemas/admin-user.schema';
import { AdminService } from 'src/services/admin-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'admin_user',
        schema: AdminSchema
      }
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
