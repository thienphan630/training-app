import { Optional } from "@nestjs/common";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Tên không được để trống' })
    @IsString({ message: 'Tên phải là chuỗi kí tự' })
    name: string;

    @IsNotEmpty({ message: 'Email không được để trống' })
    @IsEmail({}, { message: 'Email không hợp lệ' })
    email: string;

    @IsNotEmpty({ message: 'Password không được để trống' })
    @IsStrongPassword({}, { message: 'Password quá yếu' })
    @MinLength(6, { message: 'Password tối thiểu 6 ký tự' })
    password: string;

    @IsOptional()
    @IsInt({ message: 'Age phải là số nguyên' })
    @Min(16, { message: 'Độ tuổi tối thiểu là 16 tuổi' })
    age?: number;
}
