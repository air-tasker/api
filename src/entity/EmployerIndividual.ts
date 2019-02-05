import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class EmployerIndividual extends User{

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    user_id: User
}