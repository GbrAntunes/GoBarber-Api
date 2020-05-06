import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('name')
    name: string

    @Column('email')
    email: string

    @Column('password')
    password: string;

    @CreateDateColumn('created_at')
    created_at: Date

    @UpdateDateColumn('updated_at')
    updated_at: Date
}

export default User
