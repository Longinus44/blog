import { Router } from "express";
import { UserController } from "../Http/Controller/user";
import { bodyValidator, loginValidator,validate} from "../Http/Middleware/bodyValidation";
import { tokenValidation } from "../Http/Auth/AuthToken";


const router = Router()

router.get('/', tokenValidation,UserController.fetchAllUser)
router.post("/login",loginValidator, validate, UserController.userlogin)
router.post("/create",bodyValidator,validate, UserController.userRegistration)
router.patch("/:id", tokenValidation, UserController.userUpdate)

export default router