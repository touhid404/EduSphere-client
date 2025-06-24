import { useState } from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
  const [modalContent, setModalContent] = useState('');

  const openModal = (contentType) => {
    setModalContent(contentType);
    document.getElementById('my_modal_5').showModal();
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case 'about':
        return (
          <>
            <h3 className="font-bold text-lg">About EDU SPHERE</h3>
            <p className="py-2">
              EDU SPHERE is dedicated to empowering minds through quality educational articles. Our mission is to provide insightful, accurate, and engaging content to learners and educators worldwide.
            </p>
          </>
        );
      case 'contact':
        return (
          <>
            <h3 className="font-bold text-lg">Contact Us</h3>
            <p className="py-2">
              You can reach out to us at <strong>touhid435r@gmail.com</strong>. We're happy to answer questions, receive feedback, or collaborate!
            </p>
          </>
        );
      case 'terms':
        return (
          <>
            <h3 className="font-bold text-lg">Terms & Conditions</h3>
            <p className="py-2">
              By using our platform, you agree to respect our intellectual property and use the content for educational purposes only. Please refer to our complete terms page for more details.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="py-10 mt-12 border-t border-gray-200 dark:border-gray-700">
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {renderModalContent()}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">EDU SPHERE</h2>
          <p className="text-sm mt-1">Empowering minds through articles</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => openModal('about')}
            className="hover:text-pink-600 transition duration-200"
          >
            About Us
          </button>
          <button
            onClick={() => openModal('contact')}
            className="hover:text-pink-600 transition duration-200"
          >
            Contact Us
          </button>
          <button
            onClick={() => openModal('terms')}
            className="hover:text-pink-600 transition duration-200"
          >
            Terms & Conditions
          </button>
        </div>

        <div className="flex space-x-4 text-xl">
          <a
            href="https://github.com/touhid404"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white bg-gradient-to-r from-pink-500 to-red-500 p-2 rounded-full transition duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://github.com/touhid404"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white bg-gradient-to-r from-pink-500 to-red-500 p-2 rounded-full transition duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com/in/riyadh-touhid"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white bg-gradient-to-r from-pink-500 to-red-500 p-2 rounded-full transition duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://facebook.com/riyadhwhy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white bg-gradient-to-r from-pink-500 to-red-500 p-2 rounded-full transition duration-300"
          >
            <FaFacebook />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} EDU SPHERE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
