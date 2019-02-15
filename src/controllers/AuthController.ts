import AuthBll from '../bll/AuthBll';

const Joi = require('joi');
import BaseController from "./BaseController";
import {EmployerIndividual} from "../entity/EmployerIndividual";

export default class AuthController extends BaseController
{
    protected bll: AuthBll;

    constructor() {
        super();
        this.bll = new AuthBll();
    }

    public me(args, context) {

        // return {
        //     first_name: "zzz",
        //     email: "zzzzz"
        // }

        // context.validation.reset();

        context.validation.addError(null, 'xsxsxssxs');
        context.validation.addError(2);

        console.log(context.validation)+"\n\n\n\n\n\n\n";

        // console.log(context.validation.message);

        return context.validation;

    }

    // public async actionUser(args, context) {
    //
    //     try {
    //         context.validation.errors = [];
    //         context.validation.addError(3);
    //
    //         console.log(context.validation)+"\n\n\n\n\n\n\n";
    //
    //         // console.log(context.validation.message);
    //
    //         return context.validation;
    //
    //         let user = await this.bll.getUser(1);
    //
    //         if (!user) {
    //             return context.validation.getError('not found');
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
    public async actionRegisterEmployerIndividual(args, context)
    {
        try {
            let model = new EmployerIndividual();

            model.load(args);
            let schema = model.validateInput();

            console.log('schema: ',schema.error);

            if (schema.error){

                context.validation.addErrors(schema.error.details);

                return context.validation;
            }


            let register = await this.bll.registerEmployerIndividual(model);

            console.log('register: ',register);

            if(register.hasOwnProperty('error')) {

                context.validation.addError(register.error);

                return context.validation;
            }

            return register;

        }
        catch (e) {
            this.logger.error(e)
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
    //             context.validation.addError(null, error.message);
    //         });
    //
    //         return context.validation;
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
    //             context.validation.addError(1);
    //
    //             return context.res.status(200).send(login)
    //             return context.validation;
    //         }
    //
    //     } catch (e) {
    //         context.logger.logErrors(e)
    //     }
    // }
}
