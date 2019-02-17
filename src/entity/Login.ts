const Joi = require('joi');

export default class Login
{
    email: string;
    password: string;

    load(obj) {

        this.email = obj.email || null;
        this.password = obj.password || null;

        return this;
    }

    schema() {

        return Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        });
    }
}