import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { MinioService } from 'src/common/services/minio.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly minioService: MinioService) { }

    @Post('s3')
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage()
    }))
    async uploadToS3(@UploadedFile(new FileValidationPipe()) file: Express.Multer.File) {
        const url = await this.minioService.uploadFile(file);
        return { url }
    }
}
