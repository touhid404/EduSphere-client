import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="py-10 mt-12 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">EDU SOFT</h2>
          <p className="text-sm mt-1">Empowering minds through articles</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link to="/about" className="hover:text-pink-600 transition duration-200">About Us</Link>
          <Link to="/contact" className="hover:text-pink-600 transition duration-200">Contact Us</Link>
          <Link to="/terms" className="hover:text-pink-600 transition duration-200">Terms & Conditions</Link>
        </div>



        <div className="flex space-x-4 text-xl">
            <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white bg-gradient-to-r from-pink-500 to-red-500 p-2 rounded-full transition duration-300"
          >
            <FaGithub></FaGithub>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white bg-gradient-to-r from-pink-500 to-red-500 p-2 rounded-full transition duration-300"
          >
            <FaTwitter />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white bg-gradient-to-r from-pink-500 to-red-500 p-2 rounded-full transition duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white bg-gradient-to-r from-pink-500 to-red-500 p-2 rounded-full transition duration-300"
          >
            <FaFacebook></FaFacebook>
          </a>

        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} EDU SOFT. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
