import React, {  useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import Alert from '../../components/Alert/Alert';

const Login = () => {
  const { signInUser, loginWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();


  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const emailInput = form.email.value;
    const password = form.password.value;

    signInUser(emailInput, password)
      .then(() => {
        Alert('success', 'Log in successful');
        navigate(`${location.state ? location.state : "/"}`);
        
      })
      .catch((error) => {
        Alert('error', error.message);
      });
  };

  const handleGoogleLogIn = () => {
    loginWithGoogle()
      .then(() => {
        Alert('success', 'Google log in successful');
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch(() => {
        Alert('error', 'Something went wrong while logging in');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8  shadow-lg w-full max-w-md border border-teal-200 rounded-xl">
       <title>Login  Page | Roommate Finder</title>

        <h2 className="text-2xl font-bold text-teal-600 text-center mb-2 ">
          Welcome Back to Mate!
        </h2>
        <p className="text-center text-sm  mb-6">
          Find your ideal roommate in just a few clicks.
        </p>

        <form className="space-y-5" onSubmit={handleLogIn}>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
          >
            Log in
          </button>
        </form>

        <button 
          onClick={handleGoogleLogIn}
          className="mt-4 w-full flex items-center  text-white justify-center border border-gray-300 py-2 rounded-md bg-teal-600 hover:shadow-md transition text-sm"
        >
          <svg aria-label="Google logo" width="18" height="18" className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g>
              <path fill="#fff" d="M0 0h512v512H0z" />
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285f4" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#fbbc02" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </g>
          </svg>
          Login with Google
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-teal-600 hover:underline">
            Register here
          </Link>
        </p>

        
      </div>
    </div>
  );
};

export default Login;