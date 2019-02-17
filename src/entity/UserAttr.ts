const Joi = require('joi');

export class UserAttr
{
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    password_repeat: string;
    access_token: string;

    load(obj) {

        this.first_name = obj.first_name || null;
        this.last_name = obj.last_name || null;
        this.email = obj.email || null;
        this.phone = obj.phone || null;
        this.password = obj.password || null;
        this.password_repeat = obj.password_repeat || null;

        return this;
    }

    schema() {

        return Joi.object().keys({
            first_name: Joi.string().alphanum().min(3).max(255).required(),
            last_name: Joi.string().alphanum().min(3).max(255).required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            phone: Joi.string().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
            password_repeat: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
        });
    }
}
