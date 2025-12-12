// import React, { useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../features/auth/AuthSlice";

// import toast from "react-hot-toast";
// import { validatePassword } from "val-pass";
// import { Link, useNavigate } from "react-router-dom";

// import { GoogleLogin } from "react-oauth-google";
// import { useGoogleOAuthClient } from "react-oauth-google/hooks";

// import { FiUser } from "react-icons/fi";
// import { MdOutlineEmail } from "react-icons/md";
// import { GoLock } from "react-icons/go";
// import { GoArrowRight } from "react-icons/go";
// import { LuUpload } from "react-icons/lu";
// import { CgProfile } from "react-icons/cg";
// import { LuX } from "react-icons/lu";
// import { FaEye, FaEyeSlash } from "react-icons/fa";


// const Register = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.Auth);

//   const [errorMessage, setErrorMessage] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const fileInputRef = useRef(null);
//   const [preview, setPreview] = useState(null);
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isPasswordMatched, setIsPasswordMatched] = useState(null);
//   const [isPasswordValid, setIsPasswordValid] = useState(null);

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     profilePhoto: null,
//   });

//   const handleBoxClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files && event.target.files[0];
//     if (file) {
//       const objectUrl = URL.createObjectURL(file);
//       setProfileImage(objectUrl);
//       setPreview(objectUrl);
//       setFormData((prev) => ({ ...prev, profilePhoto: file }));
//     }
//   };

//   const handleRemoveImage = () => {
//     setProfileImage(null);
//     setPreview(null);
//     setFormData((prev) => ({ ...prev, profilePhoto: null }));
//     fileInputRef.current.value = "";
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "password") {
//       let { validateAll, getAllValidationErrorMessage } = validatePassword(value, 8);
//       validateAll()
//         ? setErrorMessage("")
//         : setErrorMessage(getAllValidationErrorMessage);
//       if (value === "") setErrorMessage("");
//     }
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setFormData({ ...formData, password: value });

//     const { validateAll, getAllValidationErrorMessage } = validatePassword(value, 8);
//     if (value.trim() === "") {
//       setPasswordError("");
//       setIsPasswordValid(null);
//     } else if (!validateAll()) {
//       setPasswordError(getAllValidationErrorMessage);
//       setIsPasswordValid(false);
//     } else {
//       setPasswordError("");
//       setIsPasswordValid(true);
//     }
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setFormData({...formData, confirmPassword: e.target.value,});
//     setIsPasswordMatched(null);
//     setConfirmPasswordError("");
//   };

//   const handleConfirmPasswordBlur = () => {
//     const { password, confirmPassword } = formData;
//     if (password.trim() && confirmPassword.trim()) {
//       if (password === confirmPassword) {
//         setIsPasswordMatched(true);
//         setConfirmPasswordError("");
//       } else {
//         setIsPasswordMatched(false);
//         setConfirmPasswordError("Passwords do not match");
//       }
//     } else {
//       setIsPasswordMatched(null);
//       setConfirmPasswordError("");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let { username, email, password, confirmPassword, profilePhoto } = formData;

//     if (!username || !email || !password || !confirmPassword || !profilePhoto) {
//       toast.error("Please fill all the fields");
//       return;
//     }
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     (async () => {
//       try {
//         const payload = new FormData();
//         payload.append("username", username);
//         payload.append("email", email);
//         payload.append("password", password);
//         if (profilePhoto) payload.append("profilePhoto", profilePhoto);

//         await dispatch(registerUser(payload)).unwrap();
//         toast.success("Registration successful!");

//         navigate("/login");
//       } catch (err) {
//         toast.error(err || "Something went wrong during registration");
//       }
//     })();
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-cyan-400 to-purple-600">
//       {/* TOP NAVIGATION */}
//       <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-600">
//               <img src="/Only logo-aurra.png" alt="AURRA" />
//             </div>
//             <span className="hidden sm:inline text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               AURRA
//             </span>
//           </Link>

//           <p className="text-sm text-muted-foreground">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-blue-600 hover:underline font-semibold">
//               Sign In
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 md:py-12">
//         <div className="w-full max-w-md">
//           {/* HEADER */}
//           <div className="text-center mb-8">
//             <h1 className="text-4xl md:text-4xl font-medium text-white mb-2">Create Account</h1>
//             <p className="text-white/80">Join our platform to continue</p>
//           </div>

//           {/* FORM CARD  */}
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
//             <div className="flex justify-center mb-4">
//               <div className="relative w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300">
//                 {preview ? (
//                   <img src={preview} alt="Preview" className="object-cover w-full h-full" />
//                 ) : (
//                   <CgProfile className="text-gray-400" size={50} />
//                 )}
//               </div>
//             </div>

//             <div className="space-y-4 sm:space-y-5">
//               <div className="space-y-1 sm:space-y-1.5">
//                 <h3 className="flex gap-2 items-center text-sm sm:text-base">
//                   <FiUser className="text-[#155DFC] text-lg sm:text-xl" />
//                   Full Name
//                 </h3>
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder="e.g. John Doe"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"/>
//               </div>

//               <div className="space-y-1 sm:space-y-1.5">
//                 <h3 className="flex gap-2 items-center text-sm sm:text-base">
//                   <MdOutlineEmail className="text-[#155DFC] text-lg sm:text-xl font-light" />
//                   Email Address
//                 </h3>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="e.g. johndoe@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"/>
//               </div>

//               <div className="space-y-1 sm:space-y-1.5 relative">
//                 <h3 className="flex gap-2 items-center text-sm sm:text-base">
//                   <GoLock className="text-[#155DFC] text-lg sm:text-xl" />
//                   Password
//                 </h3>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     placeholder="Enter a strong password"
//                     value={formData.password}
//                     onChange={handlePasswordChange}
//                     required
//                     className={`w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300
//                       ${
//                         isPasswordValid === null
//                           ? "border-gray-300 focus:ring-indigo-400"
//                           : isPasswordValid
//                           ? "border-green-500 focus:ring-green-400"
//                           : "border-red-500 focus:ring-red-400"
//                       }`}/>
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700">
//                     {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//                   </button>
//                 </div>

//                 {passwordError && (
//                   <p className="text-xs sm:text-sm text-red-600 mt-1">*{passwordError}</p>
//                 )}
//               </div>

//               <div className="space-y-1 sm:space-y-1.5 mt-2 relative">
//                 <h3 className="flex gap-2 items-center text-sm sm:text-base">
//                   <GoLock className="text-[#155DFC] text-lg sm:text-xl" />
//                   Confirm Password
//                 </h3>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     placeholder="Re-enter your password"
//                     value={formData.confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     onBlur={handleConfirmPasswordBlur}
//                     required
//                     className={`w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300
//                       ${
//                         isPasswordMatched === false
//                           ? "border-red-500 focus:ring-red-400"
//                           : isPasswordMatched === true
//                           ? "border-green-500 focus:ring-green-400"
//                           : "border-gray-300 focus:ring-indigo-400"
//                       }`}/>
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700">
//                     {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
//                   </button>
//                 </div>

//                 {confirmPasswordError && (
//                   <p className="text-xs sm:text-sm text-red-600 mt-1">*{confirmPasswordError}</p>
//                 )}
//               </div>

//               {/* UPLOAD FILE */}
//               <div className="w-full max-w-md mx-auto">
//                 <label className="block text-gray-700 font-medium mb-2">Profile Image</label>
//                 <div className="flex gap-4 items-center">
//                   <div
//                     onClick={handleBoxClick}
//                     className="flex flex-col justify-center items-center border-2 border-dashed border-blue-400 bg-white rounded-md w-90 h-32 cursor-pointer hover:bg-blue-50 transition-all duration-300">
//                     <LuUpload className="text-blue-500 text-2xl mb-1" />
//                     <p className="text-blue-500 text-sm font-medium">Click to change</p>
//                   </div>

//                   {profileImage && (
//                     <div className="relative inline-block">
//                       <img
//                         src={profileImage}
//                         alt="Uploaded"
//                         className="w-32 h-32 object-cover rounded-md border"/>
//                       <button
//                         onClick={handleRemoveImage}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
//                         <LuX size={18} />
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 <input
//                   type="file"
//                   accept="image/*"
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                   className="hidden"
//                   name="profilePhoto"/>
//               </div>
//             </div>

//             {/* CHECKBOX */}
//             <div className="flex items-center mt-4">
//               <input
//                 type="checkbox"
//                 required
//                 className="w-4 h-4 mr-2 accent-indigo-500"/>
//               <p className="text-xs sm:text-sm text-gray-600">
//                 I agree to the{" "}
//                 <a href="#" className="text-indigo-600 hover:underline font-medium">
//                   Terms of Service
//                 </a>{" "}
//                 and{" "}
//                 <a href="#" className="text-indigo-600 hover:underline font-medium">
//                   Privacy Policy
//                 </a>
//                 .
//               </p>
//             </div>

//             {/* BUTTON */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full relative overflow-hidden bg-linear-to-r from-cyan-400 to-purple-500 text-white py-2.5 sm:py-3 mt-6 rounded-lg transition-all duration-300 ease-in-out transform text-sm sm:text-base font-medium hover:scale-[1.02] hover:from-purple-500 hover:to-cyan-400 active:scale-95 focus:outline-none shadow-lg`}>
//               <span className="relative z-10 flex justify-center gap-3 items-center">
//                 <span>{loading ? "Creating Account..." : "Create Account"}</span>
//                 <GoArrowRight className="text-lg sm:text-xl" />
//               </span>
//               <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
//             </button>

//             <div className="flex items-center justify-center my-4 sm:my-5">
//               <div className="border-t flex-1"></div>
//               <p className="mx-4 text-xs sm:text-sm text-gray-500">Or continue with</p>
//               <div className="border-t flex-1"></div>
//             </div>

//             <button
//               type="button"
//               className="flex items-center justify-center w-full border border-gray-300 py-2 sm:py-2.5 rounded-full hover:bg-gray-50 transition-colors duration-300 text-sm sm:text-base">
//               <img
//                 src="https://www.svgrepo.com/show/355037/google.svg"
//                 alt="Google"
//                 className="w-4 h-4 sm:w-5 sm:h-5 mr-2"/>
//               Continue with Google
//             </button>
//           </form>

//           {/* FOOTER */}
//           <p className="text-center text-xs text-white/70 mt-4">
//             © {new Date().getFullYear()} AURRA. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser,googleLogin } from "../features/auth/AuthSlice";

import toast from "react-hot-toast";
import { validatePassword } from "val-pass";
import { Link, useNavigate } from "react-router-dom";

import { GoogleLogin } from "react-oauth-google";

import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { LuUpload } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { LuX } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.Auth || {});

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const handleBoxClick = () => fileInputRef.current.click();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      let { validateAll, getAllValidationErrorMessage } = validatePassword(
        value,
        8
      );
      validateAll()
        ? setErrorMessage("")
        : setErrorMessage(getAllValidationErrorMessage);
      if (value === "") setErrorMessage("");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setProfileImage(objectUrl);
      setPreview(objectUrl);
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setPreview(null);
    setFormData((prev) => ({ ...prev, profilePhoto: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });

    const { validateAll, getAllValidationErrorMessage } = validatePassword(value, 8);
    if (!value.trim()) {
      setPasswordError("");
      setIsPasswordValid(null);
    } else if (!validateAll()) {
      setPasswordError(getAllValidationErrorMessage);
      setIsPasswordValid(false);
    } else {
      setPasswordError("");
      setIsPasswordValid(true);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setFormData({ ...formData, confirmPassword: e.target.value });
    setIsPasswordMatched(null);
    setConfirmPasswordError("");
  };

  const handleConfirmPasswordBlur = () => {
    const { password, confirmPassword } = formData;
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        setIsPasswordMatched(true);
      } else {
        setIsPasswordMatched(false);
        setConfirmPasswordError("Passwords do not match");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, profilePhoto } = formData;

    if (!username || !email || !password || !confirmPassword || !profilePhoto) {
      toast.error("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = new FormData();
    payload.append("username", username);
    payload.append("email", email);
    payload.append("password", password);
    payload.append("profilePhoto", profilePhoto);

    dispatch(registerUser(payload))
      .unwrap()
      .then(() => {
        toast.success("Registration successful!");
        navigate("/login");
      })
      .catch((err) => toast.error(err));
  };

  // -----------------------
  // GOOGLE LOGIN HANDLER
  // -----------------------
  const onGoogleSuccess = (response) => {
    const idToken = response?.credential;

    if (!idToken) {
      toast.error("Google sign-in failed.");
      return;
    }

    dispatch(googleLogin(idToken))
      .unwrap()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch((err) => toast.error(err || "Google login failed"));
  };

  const onGoogleSuccess = (response) => {
    const idToken = response?.credential;

    if (!idToken) {
      toast.error("Google sign-in failed.");
      return;
    }

    dispatch(googleLogin(idToken))
      .unwrap()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch((err) => toast.error(err || "Google login failed"));
  };


  const onGoogleError = () => toast.error("Google Login Failed");


  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-400 to-purple-600">
      {/* TOP NAVIGATION */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-600">
              <img src="/Only logo-aurra.png" alt="AURRA" />
            </div>
            <span className="hidden sm:inline text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AURRA
            </span>
          </Link>

          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 md:py-12">
        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-4xl font-medium text-white mb-2">Create Account</h1>
            <p className="text-white/80">Join our platform to continue</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">

            {/* PROFILE PREVIEW */}
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300">
                {preview ? <img src={preview} alt="Preview" className="object-cover w-full h-full" /> : <CgProfile size={50} className="text-gray-400" />}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-1 sm:space-y-1.5">
                <h3 className="flex gap-2 items-center text-sm sm:text-base">
                  <FiUser className="text-[#155DFC] text-lg sm:text-xl" />
                  Full Name
                </h3>
                <input
                  type="text"
                  name="username"
                  placeholder="e.g. John Doe"
                  value={formData.username}
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

              <div className="space-y-1 sm:space-y-1.5 relative">
                <h3 className="flex gap-2 items-center text-sm sm:text-base">
                  <GoLock className="text-[#155DFC] text-lg sm:text-xl" />
                  Password
                </h3>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter a strong password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    required
                    className={`w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300
                      ${
                        isPasswordValid === null
                          ? "border-gray-300 focus:ring-indigo-400"
                          : isPasswordValid
                          ? "border-green-500 focus:ring-green-400"
                          : "border-red-500 focus:ring-red-400"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                {passwordError && (
                  <p className="text-xs sm:text-sm text-red-600 mt-1">*{passwordError}</p>
                )}
              </div>

              <div className="space-y-1 sm:space-y-1.5 mt-2 relative">
                <h3 className="flex gap-2 items-center text-sm sm:text-base">
                  <GoLock className="text-[#155DFC] text-lg sm:text-xl" />
                  Confirm Password
                </h3>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={handleConfirmPasswordBlur}
                    required
                    className={`w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300
                      ${
                        isPasswordMatched === false
                          ? "border-red-500 focus:ring-red-400"
                          : isPasswordMatched === true
                          ? "border-green-500 focus:ring-green-400"
                          : "border-gray-300 focus:ring-indigo-400"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                {confirmPasswordError && (
                  <p className="text-xs sm:text-sm text-red-600 mt-1">*{confirmPasswordError}</p>
                )}
              </div>

              {/* UPLOAD FILE */}
              <div className="w-full max-w-md mx-auto">
                <label className="block text-gray-700 font-medium mb-2">
                  Profile Image
                </label>

                <div className="flex gap-4 items-center">
                  <div
                    onClick={handleBoxClick}
                    className="flex flex-col justify-center items-center border-2 border-dashed border-blue-400 bg-white rounded-md w-90 h-32 cursor-pointer hover:bg-blue-50 transition-all duration-300"
                  >
                    <LuUpload className="text-blue-500 text-2xl mb-1" />
                    <p className="text-blue-500 text-sm font-medium">
                      Click to change
                    </p>
                  </div>

                  {profileImage && (
                    <div className="relative inline-block">
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

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  name="profilePhoto"
                />
              </div>
            </div>

            {/* CHECKBOX */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mr-2 accent-indigo-500"
              />
              <p className="text-xs sm:text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:underline font-medium">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:underline font-medium">
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full relative overflow-hidden bg-linear-to-r from-cyan-400 to-purple-500 text-white py-2.5 sm:py-3 mt-6 rounded-lg transition-all duration-300 ease-in-out transform text-sm sm:text-base font-medium hover:scale-[1.02] hover:from-purple-500 hover:to-cyan-400 active:scale-95 focus:outline-none shadow-lg`}
            >
              <span className="relative z-10 flex justify-center gap-3 items-center">
                <span>{loading ? "Creating Account..." : "Create Account"}</span>
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

            {/* GOOGLE LOGIN */}
            <div className="mt-6">
              <GoogleLogin onSuccess={onGoogleSuccess} onError={onGoogleError} />
            </div>

          </form>

          <p className="text-center text-xs text-white/70 mt-4">© {new Date().getFullYear()} AURRA. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
