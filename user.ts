
import { Gender } from "./Gender";

export class User {
    private id: number;
    private name: string;
    private gender: Gender;
    
    public constructor(id: number, name: string, gender: Gender) {
      this.id = id;
      this.name = name;
      this.gender = gender;
    }
  
    public getId(): number {
      return this.id;
    }
    
    public getName(): string {
      return this.name;
    }

    public getGender(): Gender {
      return this.gender;
    }


}
