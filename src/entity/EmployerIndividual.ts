import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {UserAttr} from "./UserAttr";
const Joi = require('joi');

@Entity()
export class EmployerIndividual extends UserAttr{

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    load(obj) {

        super.load(obj);

        return this;
    }

    schema() {

        return super.schema();
    }
}