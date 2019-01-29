import {getCustomRepository, getRepository} from "typeorm";
import UserRepository from "../repository/User";

export default class AuthDal
{
    userRepository:UserRepository;

    constructor() {

        this.userRepository = getCustomRepository(UserRepository);
    }

    public async getUsers(user_id: number) {

        try {

            return await this.userRepository
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

    public async register(username:string, email:string, password:string, birthyear:number)
    {
        let user = this.userRepository.create();

        user.username = username;
        user.email = email;
        user.password = password;
        user.birthyear = birthyear;
        user.active = 1;

        return this.userRepository.save(user);

    }

    public login(email:string)
    {
        let conditions = {email: email};

        return this.userRepository.findOne(conditions)
    }
}
