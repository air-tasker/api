import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {UserAttr} from "./UserAttr";

@Entity()
export class User extends UserAttr {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
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
    created_date: Date;

    @UpdateDateColumn()
    updated_date: number;

    @Column({
        type: "enum",
        enum: [0, 1],
        default: 0
    })
    active: 0 | 1;


}
