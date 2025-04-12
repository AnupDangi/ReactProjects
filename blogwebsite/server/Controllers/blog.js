const mongoose = require("mongoose");
const Blog = require("../model/Blog");

//list of controllers

//get all blogs
const fetchAllBlogs = async (req, res) => {
    let blogslist;
    try {
        blogslist = await Blog.find();
    }
    catch (err) {
        console.log(err);
    }
    if (!blogslist) {
        return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({ blogslist });
}

//get a single blog by id
const getBlogById = async (req, res) => {
    const id = req.params.id;
    
    console.log("Fetching blog with ID:", id);
    
    try {
        const blog = await Blog.findById(id);
        
        if (!blog) {
            console.log("Blog not found");
            return res.status(404).json({ message: "Blog not found" });
        }
        
        console.log("Found blog:", blog);
        return res.status(200).json(blog);
    }
    catch (err) {
        console.log("Error fetching blog:", err);
        return res.status(500).json({ message: "Something went wrong while fetching blog" });
    }
}

//add a new blog
const addBlog = async (req, res) => {
    const { title, description } = req.body;
    const currentdate = new Date();

    const newlyCreatedBlog = new Blog({
        title, description, date: currentdate
    })
    try {
        await newlyCreatedBlog.save();
        console.log(newlyCreatedBlog);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error saving blog" });
    }
    return res.status(201).json({ message: "Blog created successfully", blog: newlyCreatedBlog });
}

//delete a blog
const deleteBlog = async (req, res) => {
    const id = req.params.id;

    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if (!findCurrentBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//update a blog
const updateBlog = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    
    console.log("Updating blog with ID:", id);
    console.log("Update data:", req.body);
    
    try {
        const currentBlogToUpdate = await Blog.findByIdAndUpdate(
            id,
            { title, description },
            { new: true } // Return the updated document
        );
        
        if (!currentBlogToUpdate) {
            console.log("Blog not found for update");
            return res.status(404).json({ message: "Blog not found" });
        }
        
        console.log("Updated blog:", currentBlogToUpdate);
        return res.status(200).json({ message: "Blog updated successfully", blog: currentBlogToUpdate });
    }
    catch (err) {
        console.log("Error updating blog:", err);
        return res.status(500).json({ message: "Something went wrong while updating" });
    }
}

module.exports = { fetchAllBlogs, addBlog, deleteBlog, updateBlog, getBlogById };

