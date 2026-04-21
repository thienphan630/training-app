import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";


export class FileValidationPipe implements PipeTransform {
    async transform(value: Express.Multer.File) {
        if (!value) return value;

        //Check Mime Type
        const validMimeType = ["image/jpeg", "image/png", "application/pdf"];
        if (!validMimeType.includes(value.mimetype)) {
            throw new BadRequestException('Invalid mime type(MIME)')
        }

        // Check magic number
        const buffer = value.buffer;
        if (!buffer) {
            return value;
        }

        const header = buffer.subarray(0, 4).toString('hex').toUpperCase();

        // Signature đầu file
        // PNG: 89 50 4E 47
        // JPG: FF D8 FF
        // PDF: 25 50 44 46
        let isValid = false;
        if (header.startsWith('89504E47')) isValid = true; // PNG
        if (header.startsWith('FFD8FF')) isValid = true; //JPG
        if (header.startsWith('25504446')) isValid = true; //PDF

        if (!isValid) {
            throw new BadRequestException('Invalid file signature (Magic Number)');
        }

        return value;
    }
}
