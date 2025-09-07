import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        setLoading(false);
        setError(null);
        navigate('/sign-in');
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br ">
  <div className=" p-8 rounded-2xl shadow-lg w-full max-w-md">
    {/* Header */}
    <h1 className="text-3xl font-bold text-center  mb-2">
      Create an Account
    </h1>
    <p className="text-center  mb-6">
      Join <span className="text-teal-600 font-semibold">IdeaHive</span> and start sharing your stories
    </p>

    {/* Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
        id="username"
        onChange={handleChange}
      />
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
        className="w-full bg-teal-600 p-3 rounded-lg font-medium uppercase hover:bg-teal-700 disabled:opacity-80 transition"
      >
        Sign Up
      </button>
    </form>

    {/* Footer */}
    <div className="flex justify-center gap-2 mt-6 text-sm">
      <p className="text-gray-600">Already have an account?</p>
      <Link to={"/sign-in"} className="text-teal-600 font-medium hover:underline">
        Sign In
      </Link>
    </div>
  </div>
</div>

  )
}