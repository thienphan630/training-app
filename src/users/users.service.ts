import { Injectable } from '@nestjs/common';

/**
 * Interface mô tả cấu trúc dữ liệu của một User.
 * Giống như "bản thiết kế" cho đối tượng User.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable() // Đánh dấu class này có thể được "inject" vào nơi khác
export class UsersService {

  /**
   * Dữ liệu giả (mock data) - tạm thời fix cứng.
   * Sau này sẽ thay bằng dữ liệu từ Database.
   */
  private users: User[] = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@vnpt.vn', role: 'admin' },
    { id: 2, name: 'Trần Thị B',  email: 'b@vnpt.vn', role: 'user' },
    { id: 3, name: 'Lê Văn C',   email: 'c@vnpt.vn', role: 'user' },
  ];

  /** Lấy tất cả users */
  findAll(): User[] {
    return this.users;
  }

  /** Tìm user theo ID */
  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  /** Tạo user mới */
  create(name: string, email: string): User {
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
      role: 'user',
    };
    this.users.push(newUser);
    return newUser;
  }
}
