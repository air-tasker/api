import Logger from "../utils/logger";
const Joi = require('joi');

export default class  BaseController
{
    public logger: Logger;

    constructor() {

        this.logger = new Logger();
    }

    public joiValidate(obj, schema, options = {}) {

        return Joi.validate(obj, schema, {
            abortEarly: false,
            ...options
        });
    }
}