import React, { useState, useEffect, use } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comment from './Comment.jsx';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";


export default function Postview() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchPost = async () => { 
      try {
        const res = await fetch(`/api/post/getPosts?slug=${slug}`);
        const data = await res.json();

        if (!res.ok) {
          console.error(data.message);
          return;
        }

        setPost(data.posts[0]);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [slug]);
useEffect(() => {
  if(post){
    setLikes(post.likes);
    setDislikes(post.dislikes);
  
  }
}, [post]);


const handlePostLikes = async (postId) => {
   const res= await fetch(`/api/user/getuser`,{
    method:"GET",
    headers:{"Content-Type":"application/json"}
  });
  const currentUser= await res.json();
  console.log("Current User:",currentUser);
  if (!currentUser) return console.log("Please log in to like the post.");
  let dislikedId=null;
  let dislike=dislikes;
  if (currentUser.isDisliked.includes(postId)) {
    dislikedId=postId;
    dislike=dislike-1;
  }
  
  
  if (currentUser.isLiked.includes(postId)) return console.log("Already liked");

  // let updatedDislikedArray = dislikedArray;
  
  

  let like=likes;
  like=like+1;
  // console.log("####",dislikeTrue)

  try {
    const res = await fetch(`/api/user/updateLikes/${currentUser._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        likedId: postId,
        dislikedId
      })
    });

    const data = await res.json();
    if (!res.ok) return console.error(data.message);
   const postUpdateRes=await fetch(`/api/post/updatepost/${postId}`,{
        method:"PUT",
        headers:{
          "content-type": "application/json"
        },
        body:JSON.stringify({
          likes:like,
          dislikes:dislike
        })
   })
   const postUpdateData=await postUpdateRes.json();
   console.log(postUpdateData)
   if(!postUpdateData.ok) return console.log(postUpdateData.message)

    console.log("Post liked successfully :", data);
  } catch (err) {
    console.error("Error liking post:", err);
  }
};
const handlePostDislikes = async (postId) => {
   const res= await fetch(`/api/user/getuser`,{
    method:"GET",
    headers:{"Content-Type":"application/json"}
  });
  const currentUser= await res.json();
  console.log("Current User:",currentUser);
  
  if (!currentUser) return console.log("Please log in to like the post.");
  let likedId=null;
  let like=likes;
  if (currentUser.isLiked.includes(postId)) {
    likedId=postId;
    like=like-1;
  }
  if (currentUser.isDisliked.includes(postId)) return console.log("Already Disliked");

  // let updatedDislikedArray = dislikedArray;
  

  let dislike=dislikes;
  dislike=dislike+1;
  console.log(dislike)

  try {
    const res = await fetch(`/api/user/updateDislikes/${currentUser._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        likedId,
        dislikedId: postId
      })
    });

    const data = await res.json();
    if (!res.ok) return console.error(data.message);
    console.log(dislike)
  const postUpdateRes=await fetch(`/api/post/updatepost/${postId}`,{
        method:"PUT",
        headers:{
          "content-type": "application/json"
        },
        body:JSON.stringify({
          likes : like,
          dislikes: dislike
        })
   })
  //  console.log(likes);
  //  console.log(dislikes)
   const postUpdateData=await postUpdateRes.json();
  //  console.log(postUpdateData)
   if(!postUpdateData.ok) return console.log(postUpdateData.message)

    console.log("Post Disliked successfully :", data);
  } catch (err) {
    console.error("Error Disliking post:", err);
  }
};

   


  
  if (!post) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading post...
      </div>
    );
  }

  return (
   
    <div className="max-w-6xl mx-auto p-6  rounded-xl mt-6">
      <h1 className="text-3xl font-bold mb-4 ">{post.title}</h1>
      <div style={{ display: "flex", gap: "20px", fontSize: "20px" }}>
      <button onClick={() => handlePostLikes(post._id)}>
        <FaThumbsUp /> {likes<0?0:likes}
        
      </button>

      <button onClick={() => handlePostDislikes(post._id)}>
        <FaThumbsDown /> {dislikes<0?0:dislikes}
      </button>
    </div>
      {post.image && (
        <img
          src={post.image}
          alt="Blog"
          className="w-full h-auto object-cover rounded-md mb-4"
        />
      )}
      {/* <div className="leading-relaxed whitespace-pre-line">
        {post.content}
      </div> */}
      <div
  className="prose "
  dangerouslySetInnerHTML={{ __html: post.content }}
></div>
{<Comment post={post}/>}
    </div>
    
  );
}
