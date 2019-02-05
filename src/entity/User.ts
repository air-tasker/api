import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255
    })
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_date: number;

    @UpdateDateColumn()
    updated_date: number;

    @Column({
        type: "enum",
        enum: [0, 1],
        default: 1
    })
    active: 0 | 1
}
