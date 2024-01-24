import { IUser } from "../../Interface/IUser";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../../Service/userService";
import { HttpError, handleHttpError } from "../Middleware/error";
import { AppConfig } from "../../Config/appConfig";

const userService = new UserService();

export class UserController {

    static async fetchAllUser(req: Request, res: Response) {
        try {
            const users = await userService.fetchUsers()
            res.send(users)
        } catch (error) {
            if (error instanceof HttpError) {
                const handledError = handleHttpError(error);
                res.send(handledError.message);
            } else {
                res.status(500).send({ message: AppConfig.INTERNAL_ERROR });
            }
        }
    }

    static async userRegistration(req: Request, res: Response) {
        try {
            const userData: IUser = req.body
            const user = await userService.createUser(userData)
            res.send(user)
        } catch (error: any) {
            if (error instanceof HttpError) {
                const handledError = handleHttpError(error);
                res.send(handledError.message);
            } else {
                res.status(500).send({ message: AppConfig.INTERNAL_ERROR });
            }
        }
    }

    static async userlogin(req: Request, res: Response) {
        try {
            const { username, password } = req.body
            const userLoggedIn = await userService.loginUser(username, password)
            res.send(userLoggedIn)
        } catch (error: any) {
            if (error instanceof HttpError) {
                const handledError = handleHttpError(error);
                res.status(handledError.status).send(handledError.message);
            } else {
                console.log(error);

                res.status(500).send({ message: AppConfig.INTERNAL_ERROR });
            }
        }
    }

    static async userUpdate(req: Request, res: Response) {
        try {
            const { username } = req.body
            const user_id = req.params['id']
            await userService.updateUser(user_id, username)
            res.send('user update successful')
        } catch (error: any) {
            if (error instanceof HttpError) {
                const handledError = handleHttpError(error);
                res.send(handledError.message);
            } else {
                res.status(500).send({ message: AppConfig.INTERNAL_ERROR })
            }
        }
    }
}
