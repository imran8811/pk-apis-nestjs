import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProdutsModule } from 'src/modules/products/products.module';
import { ProductsSchema } from 'src/schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'pkapparel' }),
    MongooseModule.forFeature([
      {
        name: 'Products',
        schema: ProductsSchema
      }
    ]),
    ProdutsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
