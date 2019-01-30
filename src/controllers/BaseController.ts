import inputValidation from '../utils/graphql/inputValidation';
const Joi = require('joi');

export default class  BaseController
{
    validation;

    constructor() {

        this.validation = new inputValidation();
    }

    public joiValidate(args, schema, options={}) {

        return Joi.validate(args, schema, {
            abortEarly: false,
            ...options
        });
    }
}