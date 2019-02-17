import AuthBll from '../bll/AuthBll';

import BaseController from "./BaseController";
import {EmployerIndividual} from "../entity/EmployerIndividual";
import Login from "../entity/Login";

export default class AuthController extends BaseController
{
    protected bll: AuthBll;

    constructor() {
        super();
        this.bll = new AuthBll();
    }

    public me(args, context) {

    }

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

            let validation = this.joiValidate(model, model.schema());

            if (validation.error){

                context.validation.addErrors(validation.error.details);

                return context.validation;
            }

            let register = await this.bll.registerEmployerIndividual(model);

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


    public async actionLogin(args, context)
    {
        try {
            let model = new Login();

            model.load(args);

            let validation = this.joiValidate(model, model.schema());

            if (validation.error){

                context.validation.addErrors(validation.error.details);

                return context.validation;
            }

            let login = await this.bll.login(model);

            if(login.hasOwnProperty('error')) {

                context.validation.addError(login.error);

                return context.validation;
            }

            return login;
        }
        catch (e) {
            this.logger.error(e)
        }
    }
}
