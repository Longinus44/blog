import { IBlog } from "../Interface/IBlog";
import { BlogModel } from "../Model/blogmodel";

export class BlogRepository {
    private readonly blogModel: typeof BlogModel;

    constructor(blogModel: typeof BlogModel) {
        this.blogModel = blogModel;
    }

    async fetchBlogs (): Promise<IBlog[] | undefined> {
        return await this.blogModel.query().select()
    }

    async fetchBlogById(blog_id:string):Promise<IBlog | undefined>{
        return await this.blogModel.query().findById(blog_id)
    }

    async createBlog(blog:IBlog):Promise<IBlog>{
        return await this.blogModel.query().insert(blog)
    }

    async updateBlog(blog_id:string, data:Partial<IBlog>):Promise<IBlog | undefined>{
        return await this.blogModel.query().patchAndFetchById(blog_id, {title: data.title, content:data.content})
    }

    async deleteBlog(blog_id:string):Promise<number>{
        return await this.blogModel.query().deleteById(blog_id)
    }

    async fetchBlogByAuthorId(author_id:string):Promise<IBlog[]>{
        return await this.blogModel.query().where({author_id:author_id})
    }
}
