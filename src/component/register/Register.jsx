import React, {  useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import { validatePassword } from "val-pass";
import { Link, useNavigate } from "react-router-dom";

import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { LuUpload } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { LuX } from "react-icons/lu";

const Register = () => {
  let nagivate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    fileInputRef.current.value = "";
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else if (name == "password") {
      let { validateAll, getAllValidationErrorMessage } = validatePassword(
        value,
        8
      );
      validateAll()
        ? setErrorMessage("")
        : setErrorMessage(getAllValidationErrorMessage);
      value == "" && setErrorMessage("");
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { fullName, email, password, confirmPassword, image } = formData;
    if ((!fullName || !email || !password || !confirmPassword, !image)) {
      toast.error("All fields are mandatory");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Registration successful! Please log in.");
    console.log(formData);

    nagivate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:block w-full md:w-[65%] bg-linear-to-br from-cyan-400 to-purple-500 fixed left-0 h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-cyan-400/10 to-purple-500/10 backdrop-blur-sm"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full p-5">
          <img
            src="logo.png"
            alt="Logo"
            className="w-35 h-35 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-100 lg:h-100 object-contain mx-auto"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 transition-all duration-300">
            Welcome To Our Platform
          </h1>

          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white max-w-sm mx-auto leading-relaxed">
            Join thousands of users who are already experiencing the future of
            productivity.
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full md:w-[35%] bg-white md:ml-[65%] min-h-screen h-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-lg sm:rounded-2xl shadow-sm sm:shadow-blue-400 justify-start w-full max-w-[420px] mx-auto md:my-8 md:shadow-xl md:rounded-2xl p-4 sm:p-6 md:p-8 bg-white"
        >
          <h2 className="text-2xl sm:text-3xl font-light text-center mb-2 text-gray-800 transition-all duration-300">
            Create your account
          </h2>
          <p className="text-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#155DFC] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>

          {/* <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  
                  className="w-10 h-10 text-gray-400 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                > */}

          {/* <CgProfile className="h-7 w-7 "/> */}

          {/* <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v16m8-8H4"
                  /> */}
          {/* </svg>
              )}
            </div>
          </div> */}

          {/* @trial */}
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <CgProfile className="text-gray-400" size={50} />
                )}
            </div>
          </div>

          {/* <div className="text-center mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Upload profile image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-600"
            />
          </div> */}

          <div className="space-y-4 sm:space-y-5">
            <div className="space-y-1 sm:space-y-1.5">
              <h3 className="flex gap-2 items-center text-sm sm:text-base">
                <FiUser className="text-[#155DFC] text-lg sm:text-xl" />
                Full Name
              </h3>
              <input
                type="text"
                name="fullName"
                placeholder="e.g. John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <h3 className="flex gap-2 items-center text-sm sm:text-base">
                <MdOutlineEmail className="text-[#155DFC] text-lg sm:text-xl font-light" />
                Email Address
              </h3>
              <input
                type="email"
                name="email"
                placeholder="e.g. johndoe@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <h3 className="flex gap-2 items-center text-sm sm:text-base">
                <GoLock className="text-[#155DFC] text-lg sm:text-xl" />
                Password
              </h3>
              <input
                type="password"
                name="password"
                placeholder="Enter a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
            </div>

            <div
              className={`flex w-full rounded-lg ${
                !errorMessage ? "hidden" : ""
              }`}
            >
              <span className="text-xs sm:text-sm text-red-600">
                *{errorMessage}
              </span>
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <h3 className="flex gap-2 items-center text-sm sm:text-base">
                <GoLock className="text-[#155DFC] text-lg sm:text-xl" />
                Confirm Password
              </h3>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
            </div>

             <div className="w-full max-w-md mx-auto">
      <label className="block text-gray-700 font-medium mb-2">
        Profile Image
      </label>

      <div className="flex gap-4 items-center">
        {/* Upload Box */}
        <div
          onClick={handleBoxClick}
          className="flex flex-col justify-center items-center border-2 border-dashed border-blue-400 bg-white rounded-md w-90 h-32 cursor-pointer hover:bg-blue-50 transition-all duration-300"
        >
          <LuUpload className="text-blue-500 text-2xl mb-1" />
          <p className="text-blue-500 text-sm font-medium">Click to change</p>
        </div>

        {/* Image Preview */}
        {profileImage && (
          <div className="relative inline-block ">
  <img
    src={profileImage}
    alt="Uploaded"
    className="w-32 h-32 object-cover rounded-md border"
  />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <LuX size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              required
              className="w-4 h-4 mr-2 accent-indigo-500"
            />
            <p className="text-xs sm:text-sm text-gray-600">
              I agree to the{" "}
              <a
                href="#"
                className="text-indigo-600 hover:underline font-medium"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-indigo-600 hover:underline font-medium"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <button
            type="submit"
            className={`w-full relative overflow-hidden bg-linear-to-r from-cyan-400 to-purple-500 text-white py-2.5 sm:py-3 mt-6 rounded-lg 
              transition-all duration-300 ease-in-out transform text-sm sm:text-base font-medium
              hover:scale-[1.02] hover:from-purple-500 hover:to-cyan-400 active:scale-95 focus:outline-none shadow-lg`}
          >
            <span className="relative z-10 flex justify-center gap-3 items-center">
              <span>Create Account</span>
              <GoArrowRight className="text-lg sm:text-xl" />
            </span>

            <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
          </button>

          <div className="flex items-center justify-center my-4 sm:my-5">
            <div className="border-t flex-1"></div>
            <p className="mx-4 text-xs sm:text-sm text-gray-500">
              Or continue with
            </p>
            <div className="border-t flex-1"></div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center w-full border border-gray-300 py-2 sm:py-2.5 rounded-full hover:bg-gray-50 transition-colors duration-300 text-sm sm:text-base"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
            />
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

export default Register;
