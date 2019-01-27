import {EntityRepository, Repository, createConnection} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

    findByName(username: string, phone: string) {
        return this.findOne({username, phone});
    }

}