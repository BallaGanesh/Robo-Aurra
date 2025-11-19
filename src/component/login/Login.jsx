import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { loginUser } from "../features/auth/AuthSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    console.log(formData);
    
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    console.log(formData);

    (async () => {
      try {
        let result = await dispatch(loginUser(formData)).unwrap();
        console.log(result);

        if (result && result.token) {
          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error("Login failed - Invalid credentials");
        }
      } catch (error) {
        toast.error(error || "Something went wrong");
        return;
      }
    })();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:block w-full md:w-[65%] bg-linear-to-br from-cyan-400 to-purple-500 fixed left-0 h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-cyan-400/10 to-purple-500/10 backdrop-blur-sm"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full p-5">
          <img
            src="logo.png"
            alt="Logo"
            className="w-35 h-35 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-100 lg:h-100 object-contain mx-auto"/>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 transition-all duration-300">
            Welcome Back,USER
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white max-w-sm mx-auto leading-relaxed">
            Login in to continue your journey with us.
          </p>
        </div>
      </div>

      {/* Right side login form */}
      <div className="flex flex-col w-full md:w-[35%] bg-white md:ml-[65%] min-h-screen h-full mt-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-lg sm:rounded-2xl 
                justify-start w-full max-w-[420px] mx-auto md:my-8 
                p-4 sm:p-6 md:p-8 bg-white
                shadow-[0_0_25px_rgba(21,93,252,0.3)] 
                transition-shadow duration-300">
          <h2 className="text-2xl sm:text-3xl font-light text-center mb-2 text-gray-800 transition-all duration-300">
            Login in to your account
          </h2>
          <p className="text-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            Don’t have an account?{" "}
            <Link 
              to="/" 
              className="text-[#155DFC] hover:underline font-medium">
              Create one
            </Link>
          </p>

          {/* Email Field */}
          <div className="space-y-1 sm:space-y-1.5 mb-3">
            <h3 className="flex gap-2 items-center text-sm sm:text-base">
              <MdOutlineEmail className="text-[#155DFC] text-lg sm:text-xl" />
              Email Address
            </h3>
            <input
              type="email"
              name="email"
              placeholder="e.g. johndoe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"/>
          </div>

          {/* Password Field */}
          <div className="space-y-1 sm:space-y-1.5 relative">
            <h3 className="flex gap-2 items-center text-sm sm:text-base">
              <GoLock className="text-[#155DFC] text-lg sm:text-xl" />
              Password
            </h3>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"/>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700">
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mt-2">
            <a
              href="#"
              className="text-sm text-indigo-500 hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full relative overflow-hidden bg-linear-to-r from-cyan-400 to-purple-500 text-white py-2.5 sm:py-3 mt-6 rounded-lg 
              transition-all duration-300 ease-in-out transform text-sm sm:text-base font-medium
              hover:scale-[1.02] hover:from-purple-500 hover:to-cyan-400 active:scale-95 focus:outline-none shadow-lg">
            <span className="relative z-10">Log In</span>
            <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
          </button>

          <div className="flex items-center justify-center my-4 sm:my-5">
            <div className="border-t flex-1"></div>
            <p className="mx-4 text-xs sm:text-sm text-gray-500">Or continue with</p>
            <div className="border-t flex-1"></div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center w-full border border-gray-300 py-2 sm:py-2.5 rounded-full hover:bg-gray-50 transition-colors duration-300 text-sm sm:text-base">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2"/>
            Continue with Google
          </button>
        </form>

        <p className="text-[10px] sm:text-xs text-gray-500 mt-4 sm:mt-6 text-center">
          © {new Date().getFullYear()} AURRA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
