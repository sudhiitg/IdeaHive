// import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOutUserFailure,signOutUserSuccess,signOutUserStart } from '../redux/user/userSlice';
import { FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { toggleTheme} from '../redux/theme/themeSlice';


export default function Header() {
  
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = urlParams.toString();
//     // navigate(`/search?${searchQuery}`);
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);

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
    <header className=" dark:bg-gray-400 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl flex items-center space-x-1">
            <span className="text-teal-600">IdeaHive</span>
            {/* <span className="text-gray-800">App</span> */}
          </h1>
        </Link>

        {/* Search Bar */}
        <form className="relative hidden sm:flex items-center w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-3 text-gray-500 hover:text-teal-600">
            <FaSearch />
          </button>
        </form>

        {/* Nav + Actions */}
        <div className="flex items-center space-x-6">
          <nav className="hidden sm:flex gap-6 font-medium text-gray-700">
            <Link to="/" className="hover:text-teal-600 transition">Home</Link>
            <Link to="/about" className="hover:text-teal-600 transition">About</Link>
          </nav>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => dispatch(toggleTheme())}
            className="flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 text-sm transition hover:bg-gray-100"
          >
            {theme === "dark" ? <FaMoon /> : <FaSun />}
            {theme === "dark" ? "Dark" : "Light"}
          </button>

          {/* Profile */}
          {currentUser ? (
            <div className="relative group px-3">
              <Link to="/profile">
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
                />
              </Link>

              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-52 bg-white -xl shadow-lg border transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-800 origin-top-right z-50">
  <ul className="py-2 text-gray-700">
                 <Link to="/dashboard">
      <li className="flex items-center gap-3 px-4 py-2 hover:bg-teal-50 hover:text-teal-600 cursor-pointer transition">
        <span className="text-teal-500"></span> Dashboard
      </li>
    </Link>
                  <li
      className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 hover:text-red-600 cursor-pointer transition"
      onClick={handleSignOut}
    >
      <span className="text-red-500"></span> Sign Out
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className='flex px-3'> 
            <Link
              to="/sign-in"
              className="flex gap-2 px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 transition"
            >
              Sign In
            </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}