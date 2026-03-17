import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParsePositiveIntPipe implements PipeTransform {
    transform(value: any): number {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException(`${value} không phải là tham số hợp lệ`);
        }
        if (val <= 0) {
            throw new BadRequestException("ID phải là số dương");
        }
        return val;
    }
}