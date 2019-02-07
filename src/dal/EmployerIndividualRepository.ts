import {EntityRepository, Repository, createConnection, getCustomRepository} from "typeorm";
import {promises} from "fs";
import {EmployerIndividual} from "../entity/EmployerIndividual";
const Joi = require('joi');

@EntityRepository(EmployerIndividual)
export default class EmployerIndividualRepository extends Repository<EmployerIndividual> {

    findByName(username: string, email: string) {
        // return this.findOne({username, email});
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
