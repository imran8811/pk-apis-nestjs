import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:3000',
    credentials: true,
    // origin: ['http://localhost:3000'],
    methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH',
    // credentials: true,
    // allowedHeaders:
      // 'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
