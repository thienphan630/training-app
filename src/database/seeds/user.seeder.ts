import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export async function seedUsers(dataSource: DataSource) {
    const repo = dataSource.getRepository(User);
    await repo.save([
        { name: 'Admin', email: 'admin@vnpt.vn', password: '123', role: 'admin' },
        { name: 'User 1', email: 'u1@vnpt.vn', password: '123', role: 'user' },
    ]);
}
