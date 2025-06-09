import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Alert from '../../components/Alert/Alert';
import { AuthContext } from '../../provider/AuthContext';

const Register = () => {
  const { createUser, loginWithGoogle, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const emailInput = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;
    const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const isLengthValid = password.length >= 6;
    if (!hasUpperCase || !hasLowerCase || !isLengthValid) {
    let message = 'Password must:';
    if (!hasUpperCase) message += ' include an uppercase letter,';
    if (!hasLowerCase) message += ' include a lowercase letter,';
    if (!isLengthValid) message += ' be at least 6 characters long,';
    message = message.replace(/,+$/, '.'); // Clean up trailing comma
    Alert('error', message);
    return;
  }


    createUser(emailInput, password)
      .then(() => {
        updateUserProfile({
          displayName: name,
          photoURL: photoURL
        });
        Alert('success', 'Registration successful!');
        navigate('/');
      })
      .catch((error) => {
        Alert('error', error.message);
      });
  };

  const handleGoogleLogIn = () => {
    loginWithGoogle()
      .then(() => {
        Alert('success', 'Google log in successful');
        navigate('/');
      })
      .catch(() => {
        Alert('error', 'Something went wrong with Google login');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 shadow-lg w-full max-w-md border mt-2 border-indigo-200 rounded-xl">
        <title>Register Page | Edu Sphere</title>

        <h2 className="text-2xl text-indigo-600 font-bold text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-sm mb-6">
          Sign up to access exclusive content and features.
        </p>

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Enter your photo URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleLogIn}
          className="mt-4 w-full flex items-center justify-center border border-gray-300 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition text-sm"
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
          Sign up with Google
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-indigo-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
  
};

export default Register;