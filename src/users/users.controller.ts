import { Controller, Get, Post, Param, Body, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ParsePositiveIntPipe } from 'src/common/pipes/parse-positive-int.pipe';
import { ListUserDto } from './dto/list-user.dto';

@Controller('users') // Tất cả API trong class này sẽ có prefix "/users"
export class UsersController {

    /**
     * Constructor Injection:
     * NestJS tự động tạo instance của UsersService
     * và "tiêm" (inject) vào Controller.
     * Bạn KHÔNG cần viết: this.usersService = new UsersService()
     */
    constructor(private readonly usersService: UsersService) { }

    /**
     * API: GET /users
     * Trả về danh sách tất cả users
     */
    @Get()
    getAllUsers(@Query() query: ListUserDto) {
        return this.usersService.findAll(query);
    }

    /**
     * API: GET /users/:id
     * Ví dụ: GET /users/1 → trả về user có id = 1
     * @Param('id') lấy giá trị từ URL
     */
    @Get(':id')
    getUserById(@Param('id', ParsePositiveIntPipe) id: number) {
        return this.usersService.findOneUser(id);
    }


    /**
     * API: POST /users
     * Tạo user mới. Client gửi dữ liệu trong Body.
     * @Body() lấy dữ liệu từ Request Body (JSON)
     */
    @Post()
    createUser(@Body() createUserDTO: CreateUserDto) {
        return this.usersService.create(createUserDTO);
    }

    @Put(':id')
    updateUser(@Param('id', ParsePositiveIntPipe) id: number, @Body() updateUserDto: CreateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
}
