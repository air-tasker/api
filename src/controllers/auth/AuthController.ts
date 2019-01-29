import AuthBll from '../../bll/AuthBll';
import AuthDal from '../../dal/AuthDal';
// import Joi from 'joi';
const Joi = require('joi');
import AuthSchema from './AuthSchema';

export default class AuthController
{
    protected bll: AuthBll;

    constructor() {

        this.bll = new AuthBll(new AuthDal());
    }

    public me(args, context) {

        context.validation.addError(1);
        context.validation.addError(2);

        console.log(context.validation)+"\n\n\n\n\n\n\n";

        // console.log(this.validation.message);

        return context.validation;

    }

    public async actionUser(args, context) {


        try {


            let user = await this.bll.getUser(1);

            if (!user) {
                return context.validation.getError('not found');
            }
            //
            //
            return user;
        }
        catch (e) {
            console.log(e);
            // throw new ValidationError(e)
            // console.log('errrrrrr-----  ',e);
        }
    }

    public actionRegister(args, context)
    {
        // console.log(args);

        let schema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            access_token: [Joi.string(), Joi.number()],
            birthyear: Joi.number().integer().min(1900).max(2013).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required()
        });

        let result = Joi.validate({username: "fsdfs"}, schema, {
            // options: {
                abortEarly: false
            // }
        });

        return context.res.send(result.error.details);

        console.log(result);
        // console.log(result);

        try {
            let register  = this.bll.register(args.name, args.phone, args.password);

            return register;

        }
        catch (e) {
            console.log(e);
            // next(e);
        }
    }

}