import AuthBll from '../../bll/AuthBll';
import AuthDal from '../../dal/AuthDal';

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

            return user;
        }
        catch (e) {
            console.log(e);
        }
    }

    public actionRegister(args, context)
    {
        let schema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            access_token: [Joi.string(), Joi.number()],
            birthyear: Joi.number().integer().min(1900).max(2013).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required()
        });

        let result = Joi.validate(args, schema, {
            // options: {
                abortEarly: false
            // }
        });

        if (result.error){
            context.validation.getError(null,result.error.details[0].message);

            return context.validation;
        }

        try {
            return this.bll.register(args.username, args.email, args.password, args.birthyear);

        }
        catch (e) {
            console.log(e);
            // next(e);
        }
    }

    public async actionLogin(args, context)
    {
        let schema = Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        });

        let result = Joi.validate(args, schema, {
            abortEarly: false
        });

        if (result.error){
            context.validation.getError(null,result.error.details[0].message);

            return context.validation;
        }

        try {
            let login = await this.bll.login(args.email, args.password);

            if (login.auth) {

                return context.res.status(200).send(login)
            } else {

                context.validation.addError(1);

                return context.validation;
            }

        } catch (e) {
            console.log(e)
        }
    }
}
