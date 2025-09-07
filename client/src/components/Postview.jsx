import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment.jsx';
export default function Postview() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

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
