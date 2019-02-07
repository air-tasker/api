import AuthBll from '../../bll/AuthBll';

const Joi = require('joi');
import AuthSchema from './AuthSchema';
import BaseController from "../BaseController";
import {EmployerIndividual} from "../../entity/EmployerIndividual";

export default class AuthController extends BaseController
{
    protected bll: AuthBll;

    constructor() {
        super();
        this.bll = new AuthBll();
    }

    public me(args, context) {

        return {
            first_name: "zzz",
            email: "zzzzz"
        }

        this.validation.reset();

        this.validation.addError(null, 'xsxsxssxs');
        this.validation.addError(2);

        console.log(this.validation)+"\n\n\n\n\n\n\n";

        // console.log(this.validation.message);

        return this.validation;

    }

    // public async actionUser(args, context) {
    //
    //     try {
    //         this.validation.errors = [];
    //         this.validation.addError(3);
    //
    //         console.log(this.validation)+"\n\n\n\n\n\n\n";
    //
    //         // console.log(this.validation.message);
    //
    //         return this.validation;
    //
    //         let user = await this.bll.getUser(1);
    //
    //         if (!user) {
    //             return this.validation.getError('not found');
    //         }
    //
    //         return user;
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    // }

    /**
     *
     * @param args
     * @param context
     */
    public actionRegisterEmployerIndividual(args, context)
    {
        try {
            let model = new EmployerIndividual().load(args);

            // return context.res.status(200).send(model)

            let schema = this.bll.employerIndividualDal.validateInput(model);

            if (schema.error){

                this.validation.addErrors(schema.error.details);

                return this.validation;
            }


            return this.bll.registerEmployerIndividual(model);

        }
        catch (e) {
            console.log(e);
            context.logger.error(e)
        }
    }


    // public async actionLogin(args, context)
    // {
    //     let schema = Joi.object().keys({
    //         email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    //         password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    //     });
    //
    //     let result = Joi.validate(args, schema, {
    //         abortEarly: false
    //     });
    //
    //
    //     if (result.error){
    //         result.error.details.map((error) => {
    //             this.validation.addError(null, error.message);
    //         });
    //
    //         return this.validation;
    //     }
    //
    //     try {
    //         let login = await this.bll.login(args.email, args.password);
    //
    //         if (login.auth) {
    //
    //             return context.res.status(200).send(login)
    //         } else {
    //
    //             this.validation.addError(1);
    //
    //             return context.res.status(200).send(login)
    //             return this.validation;
    //         }
    //
    //     } catch (e) {
    //         context.logger.logErrors(e)
    //     }
    // }
}
