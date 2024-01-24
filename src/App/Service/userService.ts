import { IUser } from "../Interface/IUser";
import { UserRepository } from "../Repository/userRepo";
import { UserModel } from "../Model/usermodel";
import bcrypt from 'bcrypt'
import { HttpError, handleHttpError } from "../Http/Middleware/error";
import { AppConfig } from "../Config/appConfig";
import { generateToken } from "../Http/Auth/jwtAuth";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository(UserModel);
    }

    async fetchUsers(){
        try {
            const users= await this.userRepository.fetchUser()
            return users || []
        } catch (error) {
            if (error instanceof HttpError) {
                const handledError = handleHttpError(error);
                return handledError.message;
            } else {
                return new HttpError(500, AppConfig.INTERNAL_ERROR);
            }
        }
    }


    async createUser(userData: IUser) {
        try {
            const usernameAlreadyExists = await this.userRepository.fetchUserByUsername(userData.username);
            const emailAlreadyExists = await this.userRepository.fetchUserByEmail(userData.email);

            if (usernameAlreadyExists) {
                return AppConfig.USER_EXIST;
            }

            if (emailAlreadyExists) {
                return  AppConfig.EMAIL_EXIST;
            }
            const hashedKey = bcrypt.hashSync(userData.password, 10)
            userData.password = hashedKey
            const newuser = await this.userRepository.createUser(userData);            
            return newuser;

        } catch (error) {
            if (error instanceof HttpError) {
                const handledError = handleHttpError(error);
                return handledError.message;
            } else {
                return new HttpError(500, AppConfig.INTERNAL_ERROR);
            }
        }
    }

    async loginUser(username: string, password: string) {
        const user = await this.userRepository.fetchUserByUsername(username)
        if (!user) {
            return AppConfig.INVALID_CREDENTAILS
        } else {
            const validpassword = bcrypt.compareSync(password, user.password)
            if (validpassword) {
                const token = generateToken(user)
                return token
            }
            return AppConfig.USER_NOT_FOUND
        }
    }

    async updateUser(user_id: string, data: Partial<IUser>) {
        const userExist = await this.userRepository.fetchUserById(user_id)
        if (userExist) {
            return this.userRepository.updateUser(user_id, data)
        }
        return AppConfig.USER_NOT_FOUND
    }

}