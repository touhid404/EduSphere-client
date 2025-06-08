import { use } from "react";
import { AuthContext } from "../../provider/AuthContext";
import { Link, NavLink, useNavigate } from "react-router";


const NavBar = () => {


    const {user, signOutUser} = use(AuthContext);
    const navigate = useNavigate();
  


  
    const links = <>

    
      
      <NavLink to='/' className='ml-4 a'>Home</NavLink>
      <NavLink to='/profile' className='ml-4 a'>All Articles</NavLink>
      <NavLink to='/feedback' className='ml-4 a'>My Articles</NavLink>
      <NavLink to='/add-article' className='ml-4 a'>Post Article</NavLink>
    </>
    return (
        <div className=''>
            <div className="navbar bg-base-100 px-3">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {
            links
        }
      </ul>
    </div>
    <p className="font-bold text-xl hidden md:block">EDU SOFT</p>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        links
      }
    </ul>
  </div>
  <div className="navbar-end">
  {user ? (
    <>
      <div className="flex items-center gap-3">
      <div className="relative group inline-block">
  
  
</div>

        <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <Link>
          <li>
            <button
             onClick={signOutUser}
            >
              Logout
            </button>
          </li>
        </Link>
      </ul>
    </div>
      </div>
    </>
  ) : (
   <>
    <button
      onClick={() => navigate('/auth/login')}
      className="btn btn-neutral rounded-none"
    >
      Login
    </button>
    <button
      onClick={() => navigate('/auth/register')}
      className="btn btn-neutral rounded-none"
    >
      Reg
    </button>
   </>
  )}
</div>
  
</div>
            
        </div>
    );
};

export default NavBar;

