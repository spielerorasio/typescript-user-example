
import { UserService } from '../services/user_service'
import express, { Express, Request, Response } from 'express';
import { User } from "../user";
import { Gender } from "../Gender";

export class UserController {

    private static userService: UserService;

    private static GetUserService(): UserService {
      if(this.userService===null || this.userService===undefined){
          this.userService = new UserService();
      }
      return this.userService;
  }

    public static async addUser(req: Request, res: Response): Promise<User> {

      const item: {id: number, name: string, gender: Gender } = req.body;
      let user = new User(item.id, item.name, item.gender);
      return this.GetUserService().addUser(user);
        // const objSysAdmin = req.cUser ? req.cUser : Helper.defaultUser()
        // const { password } = req.body
        // const user = new User({ hashpass: password, ...req.body })
    
        // const userService: UserService = new UserService(objSysAdmin)
        // const response: ResponseWrapper = new ResponseWrapper(res)
    
        // return response.created(await userService.addUser(user))
      }
    
      public static async getUser(req: Request, res: Response): Promise<User | null> {
        
        return this.GetUserService().getUser(parseInt(req.params.id))
      }
}