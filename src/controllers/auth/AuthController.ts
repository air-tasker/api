import AuthBll from '../../bll/AuthBll';
import AuthDal from '../../dal/AuthDal';

export default class AuthController
{
    protected bll: AuthBll;

    constructor() {

        this.bll = new AuthBll(new AuthDal());
    }

    public me(args, context) {

        context.validation.addError(1);
        context.validation.addError(2);

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
        try {
            return this.bll.register(args.name, args.phone, args.password);

        }
        catch (e) {
            console.log(e);
            // next(e);
        }
    }

}
