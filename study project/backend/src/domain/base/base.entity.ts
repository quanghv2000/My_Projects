import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: true, default: 'system' })
    createdBy?: string;
    @CreateDateColumn({ nullable: true })
    createdDate?: Date;
    @Column({ nullable: true, default: 'system' })
    lastModifiedBy?: string;
    @UpdateDateColumn({ nullable: true })
    lastModifiedDate?: Date;
}
