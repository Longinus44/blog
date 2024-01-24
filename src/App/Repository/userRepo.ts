import { IUser } from "../Interface/IUser";
import { UserModel } from "../Model/usermodel";

export class UserRepository {
    private readonly userModel: typeof UserModel;

    constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }

    async fetchUser (): Promise<IUser[] | undefined> {
        return await this.userModel.query().select()
    }

    async fetchUserById(user_id:string):Promise<IUser | undefined>{
        return await this.userModel.query().findById(user_id)
    }

    async createUser(userData:IUser):Promise<IUser>{
        return await this.userModel.query().insert(userData)
    }

    async updateUser(user_id:string, data:Partial<IUser>):Promise<IUser | undefined>{
        return await this.userModel.query().patchAndFetchById(user_id, {username:data.username})
    }

    async fetchUserByUsername(username:string):Promise<IUser | undefined>{
        return await this.userModel.query().findOne({username:username})
    }

    async fetchUserByEmail(email:string):Promise<IUser | undefined>{
        return await this.userModel.query().findOne({email})
    }
}
