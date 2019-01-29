import {getCustomRepository} from "typeorm";
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

    public async register(name:string, phone:string, password:string)
    {
        let user = this.userRepository.create();

        user.username = name;
        user.phone = phone;
        user.password = password;
        user.active = 1;

        return this.userRepository.save(user);

    }
}
