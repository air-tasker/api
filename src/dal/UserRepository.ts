import {EntityRepository, Repository, createConnection, getCustomRepository} from "typeorm";
import { User } from "../entity/User";
import {promises} from "fs";
const Joi = require('joi');

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

    findByName(username: string, email: string) {
        // return this.findOne({username, email});
    }

    load(obj) {

        let user = this.create();
        user.first_name = obj.first_name;
        user.last_name = obj.last_name;
        user.email = obj.email;
        user.phone = obj.phone;
        user.password = obj.password;
        user.password_repeat = obj.password_repeat;

        return user;
    }

    validateInput(model:User, options = {}) {


        let schema = Joi.object().keys({
            first_name: Joi.string().alphanum().min(3).max(255).required(),
            last_name: Joi.string().alphanum().min(3).max(255).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            phone: Joi.string().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            password_repeat: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        });

        return Joi.validate(model, schema, {
            abortEarly: false,
            ...options
        });
    }


    public async getUsers(user_id: number) {

        try {

            return await this
                .findOne(user_id)
                .then(
                    res => res,
                    err => {
                        console.log(err)
                    });
        }
        catch (e) {
            console.log(e);
        }
    }

    // public async createUser(first_name:string, email:string, password:string, birthyear:number)
    // {
    //     let user = this.create();
    //
    //     user.username = username;
    //     user.email = email;
    //     user.password = password;
    //     user.birthyear = birthyear;
    //     user.active = 1;
    //
    //     return this.save(user);
    //
    // }

    public async createEmployerIndividual() {


    }

    public login(email:string)
    {
        let conditions = {email: email};

        return this.findOne(conditions)
    }

}
