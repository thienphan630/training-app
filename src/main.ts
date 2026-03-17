import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Bật validation toàn cục
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Tự động xóa các field không có trong DTO
    forbidNonWhitelisted: true, // Nếu user gửi các field lạ => Báo lỗi
    transform: false, // Tắt tự chuyển kiểu dữ liệu string sang number
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
