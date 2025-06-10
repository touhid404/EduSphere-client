import { use, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";
import { Link, NavLink, useNavigate } from "react-router";
import Alert from "../Alert/Alert";
import './NavBar.css';
import { FaMoon, FaSun } from 'react-icons/fa';

const NavBar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOutUser();
    Alert('success', 'Successfully logged out');
  };

  const links = <>
    <NavLink to='/' className='ml-4 a'>Home</NavLink>
    <NavLink to='/allArticles' className='ml-4 a'>All Articles</NavLink>
    <NavLink to='/myArticles' className='ml-4 a'>My Articles</NavLink>
    <NavLink to='/addArticle' className='ml-4 a'>Post Article</NavLink>
  </>;

  return (
    <div className=''>
      <div className="navbar bg-base-100 px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <p className="font-bold text-xl hidden md:block">EDU SPHERE</p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                <div className="relative group inline-block"></div>

                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img alt={user?.name} src={user?.photoURL} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <div className="lg:hidden flex flex-col">{links}</div>

                    <Link to='/myProfile'>
                      <button
                        className="ml-4"
                      >
                        My profile
                      </button>
                    </Link>

                    <button
                      onClick={handleLogOut}
                      className="w-full my-1 bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-md hover:from-pink-600 hover:to-red-600 transition"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/auth/login')}
                className="btn hidden lg:block bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 transition"
              >
                Login
              </button>

              <div className="dropdown dropdown-end lg:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  {links}

                  <button
                    onClick={() => navigate('/auth/login')}
                    className="btn w-full bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 transition mt-2"
                  >
                    Login
                  </button>
                </ul>
              </div>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 text-xl transition swap swap-rotate"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <div className="swap off text-black">
                <FaMoon />
              </div>
            ) : (
              <div className="swap on text-white">
                <FaSun />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
