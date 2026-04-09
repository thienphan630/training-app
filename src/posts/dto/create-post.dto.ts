import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

    @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
    @IsString({ message: 'Tiêu đề phải là chuỗi kí tự' })
    title: string;

    @IsNotEmpty({ message: 'Nội dung không được để trống' })
    @IsString({ message: 'Nội dung phải là chuỗi kí tự' })
    content: string;

    @IsNotEmpty({ message: 'User ID không được để trống' })
    @IsInt({ message: 'User ID phải là số nguyên' })
    userId: number;
}
