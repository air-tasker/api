import AuthDal from '../dal/AuthDal';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

export default  class AuthBll
{
    protected dal:AuthDal;

    constructor(dal:AuthDal) {

        this.dal = dal;
    }

    public async getUser(user_id: number) {

        try {

            let user = await this.dal.getUsers(user_id);

            if (!user) {
                return;
            }

            return user;
        }
        catch (e) {
            console.log(e);
        }
    }

    public async register(name:string, phone:string, password:string)
    {
        let hasPassword = bcrypt.hashSync(password, 8);

        let user = await this.dal.register(name, phone, hasPassword);

        let payload = {
            id: user.id
        };

        let token = jwt.sign(payload, process.env.AUTH_SECRET, {
                expiresIn: 30 * 86400 // expires in 30 days
            }
        );

        return {
            auth: true,
            token: token,
            username: user.username,
            phone: user.phone
        };
    }
}