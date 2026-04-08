import { User } from "../entities/user.entity";

export class ResponseUserDto {
    username: string;
    email: string;
    age: number;

    static fromEntity(user: User) {
        const dto = new ResponseUserDto()
        dto.username = user.name;
        dto.email = user.email;
        dto.age = user.age;
        return dto;
    }

    static fromEntities(users: User[]) {
        return users.map(user => this.fromEntity(user));
    }
}
