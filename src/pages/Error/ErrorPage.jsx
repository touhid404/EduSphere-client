import { useNavigate } from "react-router"; 
import errorImage from "../../assets/errorImag.svg"; 

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <img src={errorImage} alt="404 Not Found" className="w-80 max-w-full mb-8" />
      <h1 className="text-xl md:text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-teal-600 rounded-xl text-white  hover:bg-blue-700 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;