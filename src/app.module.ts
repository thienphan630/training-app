import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Load biến môi trường
    ConfigModule.forRoot({ isGlobal: true }),
    // Kết nối Database MySQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        // Tự động load các file entity (bảng)
        autoLoadEntities: true,

        /**
         * synchronize: true -> Tự động tạo bảng khi chạy app.
         * ⚠️ CHỈ DÙNG CHO MÔI TRƯỜNG DEV/TRAINING.
         * ⛔ KHÔNG DÙNG CHO PRODUCTION (vì có thể làm mất dữ liệu).
         */
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        ({ uri: configService.get<string>('MONGO_URI') }),
      inject: [ConfigService]
    }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
