const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import {EmployerIndividual} from "../entity/EmployerIndividual";
import {User} from "../entity/User";
import UserRepository from "../dal/UserRepository";
import {getCustomRepository} from "typeorm";

export default  class AuthBll
{
    public userDal:UserRepository;

    constructor() {

        this.userDal = getCustomRepository(UserRepository);
    }

    // public async getUser(user_id: number) {
    //
    //     try {
    //
    //         let user = await this.dal.getUsers(user_id);
    //
    //         if (!user) {
    //             return;
    //         }
    //
    //         return user;
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }

    public async registerEmployerIndividual(model: EmployerIndividual)
    {
        // let hashPassword = bcrypt.hashSync(password, 8);
        //
        // let user = this.dal.userRepository.create();
        //
        // user.first_name = args.
        //
        // let user = await this.dal.register(username, email, hashPassword, birthyear);
        //
        // let payload = {
        //     id: user.id
        // };
        //
        // let token = jwt.sign(payload, process.env.AUTH_SECRET, {
        //         expiresIn: 30 * 86400 // expires in 30 days
        //     }
        // );

        // return {
        //     auth: true,
        //     token: token,
        //     username: user.username,
        //     email: user.email
        // };
    }

    // public async login(email:string, password:string)
    // {
    //     let user = await this.dal.login(email);
    //
    //     let passwordIsValid = bcrypt.compareSync(password, user.password);
    //
    //     if (!passwordIsValid) {
    //         return {
    //             auth: false,
    //             token: ''
    //         }
    //     } else {
    //
    //         let payload = ({
    //             id: user.id
    //         });
    //
    //         let token = await jwt.sign(payload, process.env.AUTH_SECRET, {
    //             expiresIn: 30 * 86400 // expires in 30 days
    //         });
    //
    //         // return {
    //         //     auth: true,
    //         //     token: token
    //         // }
    //     }
    // }
}
