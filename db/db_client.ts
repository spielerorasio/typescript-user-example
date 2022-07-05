
import { Sequelize, Model, DataTypes } from 'sequelize';
import { User } from "../user";
import { Gender } from "../Gender";

class Users extends Model {}


export class DbClient {

    private sequelize: Sequelize;
    private initDB: boolean;
 
    

    public constructor() {

        const user: string = 'postgres';
        const host: string = 'localhost';
        const database: string = 'typescript-example';
        const password: string = '1234';
        const port: number = 5432;
        const Schema : string= 'aaa'
         
        this.sequelize = new Sequelize(database, user, password, { host, port, dialect: 'postgres', logging: false });
        this.initDB = false;
        //alternative 
        //this.sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/typescript-example', {logging: console.log}) // Example for postgres
        // this.sequelize = new Sequelize('postgres',  'postgres',  '1234', {    host: 'localhost',  port: 5432,   dialect: 'postgres', dialectOptions: {schema: 'aaa'}  });

        
        Users.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
              },
              name: {
                type: DataTypes.STRING,
                allowNull: false
              },
              gender: {
                type: DataTypes.STRING,
              // allowNull defaults to true
              }
          }, {
            sequelize: this.sequelize,
            modelName: 'users',
            timestamps: false
          })
         
 
    }   


    public async init(){
        if(this.initDB ){
            return;
        }
        await this.testConnection() ;

        
        try {
            await Users.sync({ force: true });  //This creates the table, dropping it first if it already existed
            this.initDB = true;
        } catch (error) {
            console.error('Unable to create table and sync to the database:', error);
        }

    }

    public async addUser(user: User){
        const result = await Users.create({
            id: user.getId(),
            name: user.getName(),
            gender: user.getGender(),
          });
        //console.log(result);
        //console.log(typeof result);
        return result;
    }

    public async getUserById(userId: number): Promise<User | null> {
        try {
            const result = await Users.findAll({
                where: {
                    id: userId,
                }
              });
            if(result.length>0){
                let resultUser: Users = result[0];//JSON.stringify(resultUser , null, 2)
                console.log(resultUser.getDataValue("id"));

                return new User(parseInt(resultUser.getDataValue("id")) ,resultUser.getDataValue("name"), resultUser.getDataValue("gender"));
            }
             
          } catch (error) {
            console.error('Unable to find userId:'+userId, error);
          }
          return null;

    }

    public async testConnection() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    }

}