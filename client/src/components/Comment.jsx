
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Comment({post}) {
  
  const{currentUser}=useSelector((state)=>state.user);
  const [text, setText] = useState('');
  const[comment, setcomment] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{   
const comment={
    content:text,
    userId:currentUser._id,
    postId:post._id
} 

     const res=await fetch('/api/comment/create',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
     })
     const data=await res.json();
        if(!res.ok){
            setError(data.message);
            setcomment(null);
            setText('');
            console.error(data.message);
            return;
        }
        if(res.ok){
            setText('');
            setcomment(data.message);
            
        }
    }catch (error) {
        setError('Failed to add comment');
        setcomment(null);
        setText('');
      console.error('Error adding comment:', error);
  }
};

const handleDelete=async(Id)=>{
  
  try{
    const res=await fetch(`/api/comment/deleteComment/${Id}`,{
      method:'DELETE'
    });
    const data=await res.json();
    console.log(data);
    if(!res.ok){
         setError(data.message);
         return;
    }
    if(res.ok){
      setComments(comments.filter((c)=>c._id!==Id));
      setcomment(data.message);
    }
  }catch(error){
  setError('Failed to delete comment');
  setcomment(null);
  console.error('Error deleting comment:', error);

}
};

useEffect(() => {   
             const getComments = async () => {
                try{
                    const res=await fetch(`/api/comment/getComments/${post._id}`);
                    const data=await res.json();
                    console.log(data);
                    if(!res.ok){
                       
                        return;
                    }
                    if(res.ok){
                        setComments(data); // Get the first 5 comments
                        console.log(comments);
                        
                    }

                }catch (error) {
                    console.error('Error fetching comments:', error);
                }
             }
                getComments();
    }, [post._id]);

  return (
    <div className="max-w-xl mx-auto p-6  rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-2">
        <h4 className="text-xl font-semibold">Leave a Comment</h4>

        <textarea
          placeholder="Your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 h-14"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600  px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>

        {comment && <p className="text-green-500">{comment}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>

      {/* Recent Comments */}
      {comments.length > 0 && (
  <div className="mt-6 border-t pt-4">
    <h5 className="text-lg font-semibold mb-2">Recent Comments</h5>
    <ul className="space-y-2">
      {comments.map((c) => (
        <li key={c._id} className="border border-gray-200 rounded p-2 flex justify-between items-center">
          <p>{c.content}</p>
          {currentUser!=null && c.userId === currentUser._id && (
            <button
              onClick={() => handleDelete(c._id)}
              type="button"
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Delete  
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
)}

    </div>

  );
}
