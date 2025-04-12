const express=require("express");
const blogRouter=express.Router();

const  {
    fetchAllBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
}=require("../Controllers/blog");


blogRouter.get("/",fetchAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.delete("/delete/:id",deleteBlog);


module.exports=blogRouter;