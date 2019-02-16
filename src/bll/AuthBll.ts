import EmployerIndividualRepository from "../dal/EmployerIndividualRepository";
import {getManager} from "typeorm";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import {EmployerIndividual} from "../entity/EmployerIndividual";
import {User} from "../entity/User";
import UserRepository from "../dal/UserRepository";
import {getCustomRepository} from "typeorm";
import errorCodes from '../utils/response/errors';

export default  class AuthBll
{
    public userDal:UserRepository;
    public employerIndividualDal:EmployerIndividualRepository;

    constructor() {

        this.employerIndividualDal = getCustomRepository(EmployerIndividualRepository);
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

    public async registerEmployerIndividual(model: EmployerIndividual):Promise<any>
    {
        let userModel = new User();

        userModel.load(model);

        let user = await this.userDal.findOne({
            email: userModel.email,
            phone: userModel.phone,
            active: 1
        }) || {};

        if(user.hasOwnProperty('id')) {
            return {
                error: errorCodes.USER_ALREADY_EXISTS
            }
        }

        userModel.password = bcrypt.hashSync(model.password, 8);

        await getManager().transaction(async transactionalEntityManager => {

            await transactionalEntityManager.save(userModel);

            model.user = userModel;

            await transactionalEntityManager.save(model);
        });

        let payload = {
            id: model.id
        };

        let token = jwt.sign(payload, process.env.AUTH_SECRET, {
                expiresIn: 30 * 86400 // expires in 30 days
            }
        );
        // console.log({model});
        // console.log({userModel});

        model.id = userModel.id;
        model.access_token = token;

        console.log(model);
        return model;
        //
        // return {
        //     auth: true,
        //     token: token,
        //     first_name: model.first_name,
        //     email: model.email
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
