import EmployerIndividualRepository from "../dal/EmployerIndividualRepository";
import {getManager} from "typeorm";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import {EmployerIndividual} from "../entity/EmployerIndividual";
import {User} from "../entity/User";
import UserRepository from "../dal/UserRepository";
import {getCustomRepository} from "typeorm";
import errorCodes from '../utils/response/errors';
import Login from "../entity/Login";

export default  class AuthBll
{
    public userDal:UserRepository;
    public employerIndividualDal:EmployerIndividualRepository;

    constructor() {

        this.employerIndividualDal = getCustomRepository(EmployerIndividualRepository);
        this.userDal = getCustomRepository(UserRepository);
    }

    public async registerEmployerIndividual(model: EmployerIndividual):Promise<any>
    {
        let userModel = new User();

        userModel.load(model);

        let user = await this.userDal.findbyEmailAndPhone(
            userModel.email,
            userModel.phone
        );

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

        model.access_token = jwt.sign(payload, process.env.AUTH_SECRET, {
                expiresIn: 30 * 86400 // expires in 30 days
            }
        );

        model.id = userModel.id;

        return model;
    }

    public async login(model:Login):Promise<any>
    {
        let user = await this.userDal.findByEmail(model.email);

        if(Object.keys(user).length === 0) {

            return {
                error: errorCodes.USER_NOT_FOUND
            }
        }

        let passwordIsValid = bcrypt.compareSync(model.password, user.password);

        if (!passwordIsValid) {
            return {
                error: errorCodes.INVALID_AUTHENTICATION_CREDENTIALS
            }
        }

        let payload = ({
            id: user.id
        });

        user.access_token = await jwt.sign(payload, process.env.AUTH_SECRET, {
            expiresIn: 30 * 86400 // expires in 30 days
        });

        return user;
    }
}
