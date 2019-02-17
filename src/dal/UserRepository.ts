import {EntityRepository, Repository, createConnection, getCustomRepository} from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

    findByName(username: string, email: string) {
        // return this.findOne({username, email});
    }

    async findbyEmailAndPhone(email:string, phone:string) {

        return await this.findOne({
            email,
            phone,
            active: 1
        }) || {}
    }

    async findByEmail(email:string):Promise<User> {

        // @ts-ignore
        return await this.findOne({
            email,
            active: 1
        }) || {};
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
