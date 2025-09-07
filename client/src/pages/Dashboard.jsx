import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaFileAlt,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useDispatch } from "react-redux";
import {
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import Header from '../components/Header.jsx';
export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { icon: <FaHome />, label: "Home" },
    { icon: <FaUser />, label: "Profile" },
    { icon: <FaFileAlt />, label: "Posts" },
    { icon: <FaSignOutAlt />, label: "Signout" },
  ];

  const fetchPosts = async () => {
    const res = await fetch("/api/post/getPosts");
    const data = await res.json();
    setPosts(data.posts);
  };

  const handleSubmit = (item) => {
    return () => {
      if (item.label === "Home") {
        navigate("/");
      } else if (item.label === "Profile") {
        navigate("/profile");
      } else if (item.label === "Posts") {
        fetchPosts();
      } else if (item.label === "Signout") {
        handleSignOut();
      }
    };
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div>{<Header/>}
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 border-r shadow-md ${
          collapsed ? "w-16" : "w-64"
        } p-4`}
      >
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <h1 className="text-xl font-bold text-teal-600">IdeaHive</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <FaBars />
          </button>
        </div>
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-20 cursor-pointer  transition"
              onClick={handleSubmit(item)}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-3xl font-semibold text-teal-600 mb-6">
           Dashboard
        </h2>

        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {posts && posts.length > 0 ? (
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-semibold text-center text-teal-600">
                Recent Posts
              </h3>

              {/* Post Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.slice(0, visibleCount).map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>

              {/* Show More Button */}
              {visibleCount < posts.length && (
                <div className="text-center">
                  <button
                    className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition shadow"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No posts found. Click on "Posts" to load content.
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
