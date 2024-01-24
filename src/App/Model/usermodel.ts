import { Model } from "objection";
import { IUser } from "../Interface/IUser";
import {v4 as uuidv4} from 'uuid'

export interface UserModel extends IUser{}

export class UserModel extends Model {
 static tableName: string = 'users';

 $beforeInsert(queryContext: any){
     this.id = uuidv4()
 }
 
 static relationMappings:{
    // blog:{
    //     relation
    // }
 }

}