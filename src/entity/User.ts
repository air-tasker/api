import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255
    })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    birthyear: number;

    @Column("int")
    active: number;
}
