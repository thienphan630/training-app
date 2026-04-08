import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('user')
export class User {
    @PrimaryGeneratedColumn() id: number;

    @Column({ length: 100 }) name: string;

    @Column({ length: 150, unique: true }) email: string;

    @Column() password: string;

    @Column({ default: 'user' }) role: string;

    @Column({ nullable: true }) age: number;

    @CreateDateColumn() created_at: Date;

    @UpdateDateColumn() updated_at: Date;
}
