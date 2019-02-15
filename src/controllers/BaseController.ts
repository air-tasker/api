import Logger from "../utils/logger";

export default class  BaseController
{
    public logger: Logger;

    constructor() {

        this.logger = new Logger();
    }

}