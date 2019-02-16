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

    loadOutput() {

    }

    validateInput(options = {}) {


        let schema = Joi.object().keys({
            first_name: Joi.string().alphanum().min(3).max(255).required(),
            last_name: Joi.string().alphanum().min(3).max(255).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            phone: Joi.string().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            password_repeat: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        });

        return Joi.validate(this, schema, {
            abortEarly: false,
            ...options
        });
    }
}