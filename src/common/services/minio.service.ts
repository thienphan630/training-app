import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


export class MinioService {
    private s3Client: S3Client;
    constructor() {
        this.s3Client = new S3Client({
            region: 'us-east-1',
            endpoint: 'http://localhost:9000/',
            credentials: {
                accessKeyId: 'vnpt_admin',
                secretAccessKey: 'vnpt_password_secure',
            },
            forcePathStyle: true, // Quan trọng với MinIO
        });
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const fileName = `${Date.now()}-${file.originalname}`;
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: 'vnpt-bucket',
                Key: fileName,
                Body: file.buffer, // Buffer file
                ContentType: file.mimetype,
                ACL: 'public-read', // Nếu muốn public
            })
        );

        return `http://localhost:9000/vnpt-bucket/${fileName}`;
    }
}
