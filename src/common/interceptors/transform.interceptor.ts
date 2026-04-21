import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface Response<T> {
    statusCode: number;
    message: string;
    data: T;
}

export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
        return next.handle().pipe(map((data) => ({
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: 'Success',
            data: data,
        })));
    }
}