import { Router } from "express";
import { BlogController } from "../Http/Controller/blog";
import { blogValidation,validate } from "../Http/Middleware/bodyValidation";
import { tokenValidation } from "../Http/Auth/AuthToken";

const router = Router()

router.get("/", tokenValidation,BlogController.blogs)
router.get("/:id", tokenValidation,BlogController.fetchBlogById)
router.post("/create",blogValidation,validate, BlogController.createBlog)
router.patch("/:id",BlogController.updateBlog)
router.delete("/:id", BlogController.deleteBlog)

export default router