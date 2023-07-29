import { Module } from '@nestjs/common';
import { AppController } from './shop.controller';
import { AppService } from './shop.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
