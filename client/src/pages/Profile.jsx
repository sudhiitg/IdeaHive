import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
// import { v2 as cloudinary } from 'cloudinary';
import { app } from '../firebase';
import dotenv from 'dotenv';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
//  dotenv.config();
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';
export default function Profile() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
 


  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

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
      formData.avatar = data.secure_url;
    } catch (err) {
      console.error("Upload Error:", err);
    }
    
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/')
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
       navigate('/');
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  }



  
  return (
    <div>{<Header/>}
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  px-6 py-12">
    <div className="w-full max-w-lg  p-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Profile
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Avatar Upload */}
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <div className="flex flex-col items-center">
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-28 w-28 object-cover cursor-pointer border-4 border-teal-500 hover:opacity-80 transition"
          />
          <p className="text-sm mt-2">
            {fileUploadError ? (
              <span className="text-red-600 font-medium">
                Error: Image must be less than 2 MB
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-600">{`Uploading ${filePerc}%...`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-600 font-medium">
                Image uploaded successfully!
              </span>
            ) : (
              <span className="text-gray-500">Click image to change</span>
            )}
          </p>
        </div>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
          onChange={handleChange}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          id="password"
          className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />

        {/* Update Button */}
        <button
          disabled={loading}
          className="w-full bg-teal-600 text-white rounded-lg py-3 font-semibold uppercase hover:bg-teal-700 transition disabled:opacity-70"
        >
          {loading ? "Updating..." : "Update"}
        </button>

        {/* Create Post Button (if Admin) */}
        {currentUser.isAdmin && (
          <Link
            to="/create-post"
            className="w-full bg-slate-700 text-center text-white rounded-lg py-3 font-semibold uppercase hover:bg-slate-800 transition"
          >
            Create New Post
          </Link>
        )}
      </form>

      {/* Account Actions */}
      <div className="flex justify-between items-center mt-6 text-sm">
        <span
          onClick={handleDeleteUser}
          className="text-red-600 hover:underline cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-600 hover:underline cursor-pointer"
        >
          Sign Out
        </span>
      </div>

      {/* Alerts */}
      {error && <p className="text-red-600 mt-5 font-medium">{error}</p>}
      {updateSuccess && (
        <p className="text-green-600 mt-5 font-medium">
          User updated successfully!
        </p>
      )}
    </div>
  </div>
  </div>
);

}
