import React, { useState,useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import{ useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import dotenv from 'dotenv';
  // dotenv.config();

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [file,setFile]=useState(null);
  const[imageUploadUrl,setImageUploadUrl]=useState('');
  const[publishError, setPublishError]=useState('');
  const[publishSuccess, setPublishSuccess]=useState('');
  const categories = ['Technology', 'Health', 'Education', 'Finance', 'Lifestyle'];

  const navigate = useNavigate();
  useEffect(() => {
      if (file) {
        console.log(file);
        handleFileUpload(file);
      }
    }, [file]);
  
     const handleFileUpload = async(file) => {
      const fileData=new FormData();
      fileData.append("file",file);
      fileData.append("upload_preset","ProfileImage");
      console.log(fileData);
    try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: fileData,
          }
        );
  
        const data = await res.json();
        console.log("Uploaded:", data);
  
        // setImageUrl(data.secure_url); // save the URL
        setImageUploadUrl(data.secure_url);
      } catch (err) {
        console.error("Upload Error:", err);
      }
      
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{ 
        const postData ={
            title,
            category,
            content,
            "image":imageUploadUrl
        }
       
        const res =await fetch('/api/post/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
       
         const data= await res.json();
         console.log(res.ok);
       
        if(!res.ok){
           setPublishError(data.message);
           return;
        }
        if(res.ok){
            setPublishError(null);
            setPublishSuccess('Post published successfully!');
            navigate(`/post/${data.slug}`); 
        }
  
        }catch (error) {
 setPublishError('Failed to publish post. Please try again later.');        }
    }

return (
  <div>
  {<Header/>}
  <div className="max-w-5xl mx-auto p-6 rounded-lg">
    <h2 className="text-3xl font-bold mb-6 text-center">
      Create New Post
    </h2>

    {/* Title Input */}
    <div className="mb-6">
      <label className="block text-lg font-medium mb-2">
        Title
      </label>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>

    {/* Category Dropdown */}
    <div className="mb-6">
      <label className="block text-lg font-medium  mb-2">
        Category
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="">Select a category</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>

    {/* Upload Image */}
    <div className="mb-6">
      <label className="block text-lg font-medium  mb-2">
        Upload Image
      </label>
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        accept="image/*"
        className="block w-full text-lg"
      />
    </div>

    {/* Text Editor */}
    <div className="mb-6">
      <label className="block text-lg font-medium  mb-2">
        Content
      </label>
      <div className="h-[500px]">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Start writing your story..."
          className="h-full text-lg"
        />
      </div>
    </div>

    {/* Submit Section (moved outside Quill) */}
    <div className="flex items-center gap-4 py-4">
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-teal-500  text-lg rounded-lg hover:bg-teal-700 transition"
      >
        Publish
      </button>

      {publishError && (
        <span className="text-red-500 text-lg">{publishError}</span>
      )}
      {publishSuccess && (
        <span className="text-green-500 text-lg">{publishSuccess}</span>
      )}
    </div>
  </div>
  </div>
);

}   
