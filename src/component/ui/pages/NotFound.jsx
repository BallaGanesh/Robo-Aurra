import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
          404
        </h1>

        <p className="text-lg md:text-xl text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>

        <a
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;


// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error(
//       "404 Error: User attempted to access non-existent route:",location.pathname,
//     );
//   }, [location.pathname]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4">404</h1>
//         <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
//         <a href="/" className="text-blue-500 hover:text-blue-700 underline">Return to Home</a>
//       </div>
//     </div>
//   );
// };

// export default NotFound;