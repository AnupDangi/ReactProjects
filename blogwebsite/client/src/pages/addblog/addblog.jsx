import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context"
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddNewBlog() {
    const { formData, setFormData, isEdit, setIsEdit } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [blogId, setBlogId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // DEBUG LOGS
    console.log("=== AddNewBlog Component ===");
    console.log("Current location state:", location.state);
    console.log("isEdit value:", isEdit);
    console.log("formData:", formData);

    useEffect(() => {
        // If we're in edit mode with a blog in state
        if (location.state && location.state.blog) {
            const blog = location.state.blog;
            console.log("DEBUG: Setting up edit mode with blog:", blog);
            console.log("DEBUG: Blog ID from state:", blog._id);
            
            setFormData({
                title: blog.title || "",
                description: blog.description || ""
            });
            setBlogId(blog._id); // Store the blog ID
            setIsEdit(true);
        } else {
            // Reset form when not in edit mode
            console.log("DEBUG: Not in edit mode, resetting form");
            setFormData({ title: "", description: "" });
            setBlogId(null);
            setIsEdit(false);
        }
    }, [location.state, setFormData, setIsEdit]);

    async function handleSaveBlog(e) {
        e.preventDefault();
        setLoading(true);
        
        try {
            if (isEdit && blogId) {
                // Update existing blog
                console.log(`DEBUG: Updating blog with ID: ${blogId}`);
                console.log("DEBUG: Update data:", formData);
                
                // Log the full URL and request body
                const updateUrl = `http://localhost:5000/blogs/update/${blogId}`;
                console.log("DEBUG: Update URL:", updateUrl);
                
                const response = await axios.put(updateUrl, {
                    title: formData.title,
                    description: formData.description
                });
                
                console.log("DEBUG: Raw axios response:", response);
                const result = response.data;
                console.log("DEBUG: Update result:", result);
                
                if (result?.message) {
                    console.log("DEBUG: Update successful, navigating to home");
                    setIsEdit(false);
                    setFormData({ title: "", description: "" });
                    navigate("/");
                } else {
                    console.log("DEBUG: Update response missing message property:", result);
                }
            } else {
                // Create new blog
                console.log("DEBUG: Creating new blog with data:", formData);
                const response = await axios.post("http://localhost:5000/blogs/add", {
                    title: formData.title,
                    description: formData.description
                });
                
                console.log("DEBUG: Raw axios response:", response);
                const result = response.data;
                console.log("DEBUG: Create result:", result);
                
                if (result?.message) {
                    console.log("DEBUG: Create successful, navigating to home");
                    setFormData({ title: "", description: "" });
                    navigate("/");
                } else {
                    console.log("DEBUG: Create response missing message property:", result);
                }
            }
        } catch (err) {
            console.error("ERROR: Error saving blog:", err);
            console.error("ERROR: Error response:", err.response?.data);
            alert(`Failed to save blog: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
                {isEdit ? "Edit Blog" : "Add a Blog"}
            </h1>
            
            <form onSubmit={handleSaveBlog} className="bg-white shadow-md rounded-lg p-6">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Blog Title
                        </label>
                        <input 
                            type="text"
                            placeholder="Enter Blog Title"
                            id="title"
                            name="title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.title || ""}
                            onChange={(e) => {
                                console.log("Title changed:", e.target.value);
                                setFormData({...formData, title: e.target.value});
                            }}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Blog Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Enter blog description"
                            id="description"
                            rows="6"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.description || ""}
                            onChange={(e) => {
                                console.log("Description changed:", e.target.value);
                                setFormData({...formData, description: e.target.value});
                            }}
                        >
                        </textarea>
                    </div>
                    
                    <div className="flex justify-end">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`px-6 py-2 rounded-md text-white font-medium ${
                                loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700 transition-colors'
                            }`}
                        >
                            {loading ? "Saving..." : (isEdit ? "Update Blog" : "Add New Blog")}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}