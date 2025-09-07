import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";



export default function PostCard({ post }) {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleDelete=async(Id)=>{
  
  try{
    const res=await fetch(`/api/post/deletepost/${Id}`,{
      method:'DELETE'
    });
    const data=await res.json();
    console.log(data);
    if(!res.ok){
         setError(data.message);
         return;
    }
    if(res.ok){
      
      setMessage(data.message);
     
    }
  }catch(error){
  setError('Failed to delete comment');
  setMessage(null);
  console.error('Error deleting comment:', error);

}
};
  return (
    <div className="group flex w-full max-w-2xl border border-teal-500 hover:border-2 rounded-lg overflow-hidden transition-all">
      {/* Left side image */}
      <Link to={`/post/${post.slug}`} className="w-1/3">
        <img
          src={post.image}
          alt="post cover"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Right side content */}
      <div className="p-4 flex flex-col justify-between w-2/3">
        <div>
          <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
          <span className="italic text-sm text-gray-600">{post.category}</span>
        </div>

        <Link
        to={currentUser==null?'/sign-in':`/post/${post.slug}`}
          className="mt-3 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md"
        >
          Read article
        </Link>
       
         { currentUser  && (
            <button
              onClick={() => handleDelete(post._id)}
              type="button"
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
            
          )}
          {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
      </div>
    </div>
  );
}
