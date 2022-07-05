
import { User } from "../user";
import { Gender } from "../Gender";
import { DbClient } from "../db/db_client";




export class UserService {

    private dbClient: DbClient;

    public constructor() {
        this.dbClient = new DbClient();
    }

    public async addUser(user: User): Promise<User>{
        await this.dbClient.init();
        //console.log(user);
        this.dbClient.addUser(user);
        return user;

    }

    public async getUser(userId: number): Promise<User | null> {
        await this.dbClient.init();
        let result = await this.dbClient.getUserById(userId);
        //console.log(result);

        return result;
    }
}