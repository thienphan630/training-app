import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {

  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) { }

  async create(createPostDto: CreatePostDto, userId: number) {
    const user = await this.userService.findOne(userId);
    const post = await this.postRepository.create({
      ...createPostDto,
      user: user
    })
    return this.postRepository.save(post);
  }

  async findAll() {
    return this.postRepository.find({
      relations: ['user']
    });
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!post) {
      throw new NotFoundException(`Không tìm thấy bài viết có ID ${id}`);
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
