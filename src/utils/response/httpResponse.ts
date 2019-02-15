import inputValidationMessages from './responseMessages';

export default class httpResponse extends Error {

    public errors:Array<object>;

    constructor() {

        super();

        console.log('init log');
        this.errors = [];
    }

    /**
     * @type {Array}
     * example errors: [{
     *          status: 422,
     *          msg: 'Email or password is incorrect',
     *          detail: http://wwww.taxi.com/api/doc/client
     *      }]
     */

    public createResponse = (code = null, msg = '') => {

        if(code) {
            let res = inputValidationMessages[code];

            res = Object.assign({status: code}, res);

            return res;
        }
        else if(msg) {

            return {msg};
        }
    }

    public addError = (code, msg) => {

        let error = this.createResponse(code, msg);

        this.errors.push(error);

        this.message = JSON.stringify(this.errors);
    };

    public addErrors = (errors) => {

        errors.map((error) => {
            this.addError(null, error.message);
        });
    };

    public getError = (code, msg) => {

        let error  = this.createResponse(code, msg);

        this.message = JSON.stringify([error]);

        return this;
    }

    public reset() {

        this.errors = [];
    }
}
