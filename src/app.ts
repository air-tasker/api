import * as express from "express";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import {createConnection} from "typeorm";
import AuthController from "./controllers/auth/AuthController";
import inputValidation from "./utils/response/httpResponse";
import Logger from "./utils/logger";
import {promises} from "fs";

var graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schemas');
const cors = require('cors');
const helmet = require('helmet');

class App {

    public app: express.Application;
    public graphLogger;

    constructor() {
        this.app = express();

        this.graphLogger = new Logger();

        this.config();
        this.init();
    }

    private config(): void{

        this.app.use(helmet());

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type");
            next();
        });

        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

    }

    public async init() {

        await createConnection();

        const auth = await new AuthController();

        var root = {
            // users: auth.actionUser.bind(auth),
            me: auth.me.bind(auth),
            register_employer_individual: auth.actionRegisterEmployerIndividual.bind(auth)
            // login: auth.actionLogin.bind(auth)
        };

        this.app.use('/graphql', cors(), graphqlHTTP((request, response, graphQLParams, next) => {
// console.log(graphQLParams);
// next()
            console.log('\n---------------------------------------\n')

                return {
                    schema: schema,
                    rootValue: root,
                    graphiql: true,
                    context: {
                        req: request,
                        res: response,
                        logger: this.graphLogger,
                    },
                    formatError: (error) => {

                        let message;

                        console.log('error: ',error)

                        function IsJsonString(str) {
                            try {
                                JSON.parse(error.message);
                            } catch (e) {
                                return false;
                            }
                            return true;
                        }

                        message = IsJsonString(error.message) ? JSON.parse(error.message) : error.message;

                        console.log('MESSAGEEEEEE: ',message);

                        return {
                            error: message,
                            path: error.path
                        }
                    }
                }
            }
        ));

        this.app.use(() => {
            console.log('heeee')
        })
    }
}

export default new App().app;
