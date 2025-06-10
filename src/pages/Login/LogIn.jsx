import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import Alert from '../../components/Alert/Alert';
import logLottie from '../../assets/lottie/login.json';
import Lottie from 'lottie-react';
import axios from 'axios';
import { format } from 'date-fns';
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
      .then((result) => {
        const user = result.user;
        const name = user.displayName;
        const email = user.email;
        const image = user.photoURL;
        const createdDate = format(new Date(), 'PPP p');
  
        axios.post('http://localhost:3000/users', {
          name,
          email,
          image,
          createdDate,
        })
          .then(res => {
            if (res.data.insertedId) {
              Alert('success', 'New Google user registered!');
            } else if (res.data.message === 'User already exists') {
              Alert('success', 'Welcome back! You already have an account.');
            } else {
              Alert('info', res.data.message || 'Logged in successfully');
            }
            navigate('/');
          })
          .catch(error => {
            Alert('error', error.message || 'Error during Google login');
          });
      })
      .catch(() => {
        Alert('error', 'Something went wrong with Google login');
      });
  };

 return (
  <div className="flex items-center justify-center min-h-screen  px-4">
    <div className="flex flex-col md:flex-row w-full max-w-5xl  shadow-lg border border-indigo-200 rounded-xl overflow-hidden">
      
      <div className="md:w-1/2 flex items-center justify-center p-6 bg-pink-50">
        <Lottie animationData={logLottie} style={{ width: '100%', maxWidth: 400 }} />
      </div>

      <div className="md:w-1/2 p-8">
        <title>Login Page | Edu Sphere</title>

        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back to Mate!</h2>
        <p className="text-center text-sm mb-6">
          Please log in to continue to your account.
        </p>

        <form className="space-y-5" onSubmit={handleLogIn}>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-md hover:from-pink-600 hover:to-red-600 transition"
          >
            Log in
          </button>
        </form>

        <button
          onClick={handleGoogleLogIn}
          className="mt-4 w-full flex items-center justify-center text-white  py-2 rounded-md bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transition text-sm"
        >
          <svg aria-label="Google logo" width="18" height="18" className="mr-2 rounded-2xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
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

        <p className="text-center mt-6 text-sm ">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-pink-700 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  </div>
);

};

export default Login;
