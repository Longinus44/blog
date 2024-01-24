import { IBlog } from "../../Interface/IBlog";
import { Request, Response, NextFunction } from "express";
import { BlogService } from "../../Service/blogService";
import { HttpError, handleHttpError } from "../Middleware/error";
import { tokenValidation } from "../Auth/AuthToken";
import { AppConfig } from "../../Config/appConfig";

const blogService = new BlogService();

export class BlogController {

    static async blogs(req: Request, res: Response) {
        try {
            const blog = await blogService.fetchAllBlogs()
            res.status(201).json({
                data: blog
            })
        } catch (error: any) {
            if (error instanceof HttpError) {
                const handledError = handleHttpError(error);
                res.send(handledError.message);
            } else {
                console.log(error);

                throw new HttpError(500, AppConfig.INTERNAL_ERROR);
            }
        }
    }

    static async createBlog(req: Request & { user?: string }, res: Response) {
        try {
            await tokenValidation(req, res, async () => {
                const author_id = req.user;
                if (!author_id) {
                    return res.status(401).json({ error: AppConfig.UNAUTHORIZED });
                }

                const blogData: IBlog = req.body
                blogData.author_id = author_id
                const blog = await blogService.createBlog(blogData);
                res.status(201).json({
                    message: AppConfig.SUCCESS_MSG,
                    data: blog
                });
            })
        } catch (error) {
            if (error instanceof HttpError) {
                const handledError = handleHttpError(error);
                res.send(handledError.message);
            } else {
                throw new HttpError(500, AppConfig.INTERNAL_ERROR);
            }
        }
    }



    static async fetchBlogById(req: Request, res: Response) {
        try {
            const blog_id = req.params['id']
            const blog = await blogService.fetchBlogById(blog_id)
            res.send(blog)
        } catch (error: any) {
            if (error instanceof HttpError) {
                const handledError = handleHttpError(error);
                res.send(handledError.message);
            } else {
                console.log(error);

                return new HttpError(500, AppConfig.INTERNAL_ERROR);
            }
        }
    }

    static async updateBlog(req: Request & { user?: string }, res: Response) {
        try {
            await tokenValidation(req, res, async () => {
                const author_id = req.user;
                if (!author_id) {
                    return res.status(401).json({ error: AppConfig.UNAUTHORIZED });
                }
                const data: Partial<IBlog> = req.body
                const blog_id = req.params['id']
                const blog = await blogService.fetchBlogById(blog_id)
                if (!blog) {
                    return res.status(404).json({ error: AppConfig.BLOG_NOT_FOUND });
                }
                if (author_id != blog.author_id) {
                    return res.status(403).json({ error: AppConfig.UNAUTHORIZED })
                }
                const updatedBlog = await blogService.updateBlog(blog_id, data)
                res.status(200).json({ message: AppConfig.SUCCESS_MSG, data: updatedBlog })
            })
        } catch (error: any) {
            if (error instanceof HttpError) {
                const handledError = handleHttpError(error);
                res.status(404).send(error.message);
            } else {
                res.status(500).send ({ error: AppConfig.INTERNAL_ERROR });;
            }
        }
    }

    static async deleteBlog(req: Request & {user?:string}, res: Response) {
        try {
            await tokenValidation(req,res, async()=>{
                const author_id = req.user;
                if(!author_id){
                    return res.status(401).send({error: AppConfig.UNAUTHORIZED})
                }
            const blog_id = req.params['id']
            const blog = await blogService.fetchBlogById(blog_id)
            if(!blog){
                return res.status(404).json({ error: AppConfig.BLOG_NOT_FOUND});
            }
            if(author_id != blog.author_id){
                return res.status(403).send({error:AppConfig.UNAUTHORIZED})
            }
            await blogService.deleteBlog(blog_id)
            res.send(AppConfig.SUCCESS_MSG)
            })
        } catch (error: any) {
            if (error instanceof HttpError) {
                const handledError = handleHttpError(error);
                res.send(handledError.message);
            } else {
                throw new HttpError(500, AppConfig.INTERNAL_ERROR);
            }
        }
    }
}
