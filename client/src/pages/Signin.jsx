import { useState,React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
     
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br ">
  <div className=" p-8 rounded-2xl shadow-lg w-full max-w-md">
    {/* Header */}
    <h1 className="text-3xl font-bold text-center mb-2">
      Welcome Back
    </h1>
    <p className="text-center  mb-6">
      Sign in to continue blogging on <span className="text-teal-600 font-semibold">IdeaHive</span>
    </p>

    {/* Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        id="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        id="password"
        onChange={handleChange}
      />

      <button
        disabled={loading}
        className="w-full bg-teal-600 text-white p-3 rounded-lg font-medium uppercase hover:bg-teal-700 disabled:opacity-80 transition"
      >
        {loading ? "Loading..." : "Sign In"}
      </button>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* OAuth */}
      <OAuth />
    </form>

    {/* Footer */}
    <div className="flex justify-center gap-2 mt-6 text-sm">
      <p className="text-gray-600">Don’t have an account?</p>
      <Link to={"/sign-up"} className="text-teal-600 font-medium hover:underline">
        Sign Up
      </Link>
    </div>

    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
  </div>
</div>

  );
}