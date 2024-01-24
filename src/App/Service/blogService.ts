import { HttpError, handleHttpError } from "../Http/Middleware/error";
import { IBlog } from "../Interface/IBlog";
import { BlogModel } from "../Model/blogmodel";
import { BlogRepository } from "../Repository/blogRepo";

export class BlogService {
    private  blogRepository: BlogRepository;

    constructor(){
        this.blogRepository = new BlogRepository(BlogModel);
    }

    async fetchAllBlogs(){
        const blogs = await this.blogRepository.fetchBlogs()
        return blogs || [];
    }

    async fetchBlogById(blog_id: string): Promise<IBlog | undefined> {
        try {
          const blog = await this.blogRepository.fetchBlogById(blog_id);
          if(blog){
          return blog;
          }
          return
        } catch (error) {
          return ;
        }
      }
      
      

    async createBlog(userBlog: IBlog) {
        try {
            const blog = await this.blogRepository.createBlog(userBlog)
            if (blog) {
                return blog
            }
            return new Error('error while creating blog')
        } catch (error) {
            return new Error("internal server error")
        }
    }

    async updateBlog(blog_id: string, data: Partial<IBlog>) {
        const blogExist = await this.blogRepository.fetchBlogById(blog_id)
        if (blogExist) {
            return this.blogRepository.updateBlog(blog_id,data)
        }
        return new Error("Blog doesn't exist")
    }

    async deleteBlog(blog_id: string) {
        const userExist = await this.blogRepository.deleteBlog(blog_id)
        if (userExist) {
            return this.blogRepository.deleteBlog(blog_id)
        }
        return new Error("Blog doesn't exist")
    }

}