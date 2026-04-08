import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config(); // Load file .env

if (!process.env.DB_PORT) {
    throw new Error('DB_PORT is not defined');
}

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['src/**/*.entity.ts'],
    migrations: ['migrations/*.ts'],
    synchronize: false, // ⛔ Tắt để dùng Migration
});
