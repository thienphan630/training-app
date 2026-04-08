import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable() // Đánh dấu class này có thể được "inject" vào nơi khác
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  /** Lấy tất cả users */
  async findAll() {
    const users = await this.userRepo.find();
    return ResponseUserDto.fromEntities(users);
  }

  async findOneUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng có ID ${id}`);
    }
    return ResponseUserDto.fromEntity(user);
  }

  /** Tìm user theo ID */
  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng có ID ${id}`);
    }
    return user;
  }

  async update(id: number, dto: any) {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  /** Tạo user mới */
  async create(dto: CreateUserDto) {
    const newUser = this.userRepo.create(dto);
    return this.userRepo.save(newUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }
}
