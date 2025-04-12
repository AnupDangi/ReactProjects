import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { blogs,
          setBlogs,
          pending, 
          setPending,
          isEdit,
          setIsEdit 
        } = useContext(GlobalContext);
    const navigate = useNavigate();

    async function fetchListOfBlogs() {
        setPending(true);
        try {
            const response = await axios.get("http://localhost:5000/blogs");
            const result = await response.data;
            console.log(result);
            if (result && result.blogslist) {
                setBlogs(result.blogslist);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setPending(false);
        }
    }

    function handleEditBlog(blog){
        // Set edit mode to true
        setIsEdit(true);
        console.log("Navigating to edit with blog:", blog);
        navigate("/addblog", { state: { blog } });
    }

    async function handleDeleteBlog(id){
        try {
            const response = await axios.delete(`http://localhost:5000/blogs/delete/${id}`);
            const result = await response.data;
            console.log(result);
            if(result?.message){
                setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
            }
        }
        catch(err){
            console.error("Error deleting blog:", err);
        }
    }

    useEffect(() => {
        fetchListOfBlogs();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Blog List</h1>
            {
                pending ? (
                    <div className="flex justify-center items-center h-40">
                        <h1 className="text-xl font-semibold text-gray-600">Loading Blogs! Please wait...</h1>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        { blogs.length > 0 ? (
                            blogs.map((blogItem) => (
                                <div key={blogItem._id} className="bg-white shadow-md rounded-lg p-6 transition-all hover:shadow-lg">
                                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{blogItem.title}</h2>
                                    <p className="text-gray-600 mb-4">{blogItem.description}</p>
                                    <div className="flex gap-4 justify-end">
                                        <button 
                                            onClick={() => handleEditBlog(blogItem)}
                                            className="text-blue-500 hover:text-blue-700 transition-colors"
                                        >
                                            <FaEdit size={24} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteBlog(blogItem._id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <FaTrash size={24} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <h1 className="text-xl font-semibold text-gray-600">No blogs found</h1>
                            </div>
                        )}   
                    </div>
                )
            }
        </div>
    );
}