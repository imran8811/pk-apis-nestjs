import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule, AdminModule, AuthModule, CartModule, OrderModule } from 'src/modules';
import { CartService, OrderService } from 'src/services';
import config from '../../config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://imran8811:Piyar1dafa%21%40%23@pkapparel.6x7jk.mongodb.net/?retryWrites=true&w=majority&appName=pkapparel' , { dbName: 'pkapparel'}),
    // MongooseModule.forRoot(process.env.DB_STRING_LOCAL, { dbName: 'pkapparel'}),
    ProductModule,
    AdminModule,
    AuthModule,
    CartModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
