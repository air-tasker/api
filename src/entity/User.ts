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
    phone: string;

    @Column()
    password: string;

    @Column("int")
    active: number;
}
