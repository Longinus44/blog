import { AppConfig } from "../../Config/appConfig";
import { IUser } from "../../Interface/IUser";
import * as jwt from 'jsonwebtoken';

  export const generateToken =(userData: IUser)  =>{
    const secretKey = AppConfig.JwtsecretKey
    const payload = {
      user_id: userData.id,
      username: userData.username,
    };

    const options: jwt.SignOptions = {
      expiresIn: '1h',
    };
    const token = jwt.sign({data: payload}, secretKey, options);
        return token}

