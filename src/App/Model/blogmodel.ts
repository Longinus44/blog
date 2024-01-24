import { IBlog } from "../Interface/IBlog";
import { Model} from "objection";
import {v4 as uuidv4} from 'uuid'

export interface BlogModel extends IBlog{}

export class BlogModel extends Model {
 static tableName: string = 'blogs';

 $beforeInsert(queryContext: any){
     this.id = uuidv4()
 } 
 static relationMappings: {
    // user: {
    //     relation: Model.HasManyRelations,
    // }
 }
}
