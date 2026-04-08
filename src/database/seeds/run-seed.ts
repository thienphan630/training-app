import dataSource from '../../../typeorm.config';
import { seedUsers } from './user.seeder';

async function runSeed() {
    try {
        await dataSource.initialize();
        console.log('📦 Database connected');

        await seedUsers(dataSource);
        console.log('✅ User seeded successfully');

        await dataSource.destroy();
        console.log('🔌 Database connection closed');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

runSeed();
