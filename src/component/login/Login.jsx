
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { loginUser } from "../features/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.Auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setLocalError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setLocalError("Please fill all fields");
      toast.error("Please fill all fields");
      return;
    }

    (async () => {
      try {
        let result = await dispatch(loginUser(formData)).unwrap();
       

        if (result && result.token) {
          toast.success("Login successful!");
          navigate("/home");
        } else {
          setLocalError("Login failed - Invalid credentials");
          toast.error("Login failed - Invalid credentials");
        }
      } catch (error) {
        setLocalError(error || "Something went wrong");
        toast.error(error || "Something went wrong");
      }
    })();
  };

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
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>

      {/* MAIN CONTENT */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 md:py-12">
        {/* FORM CARD */}
        <div className="w-full max-w-md">
          {/* CARD HEADER */}
          <div className="text-center  mb-8">
            <h1 className="text-4xl md:text-4xl font-medium text-white  mb-2">
              Welcome Back
            </h1>
            <p className="text-white/80">
              Sign in to your AURRA account to continue
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6"
          >
            {/* ERROR MESSAGE */}
            {(error || localError) && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-600 text-sm font-medium">
                  {error || localError}
                </p>
              </div>
            )}

            {/* FORM FIELDS */}
            <div className="space-y-4">
              {/* EMAIL */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MdOutlineEmail size={18} className="text-blue-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <GoLock size={18} className="text-blue-600" />
                    Password
                  </label>
                  <Link
                    to="#"
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-600 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 relative overflow-hidden bg-linear-to-r from-cyan-400 to-purple-500 text-white py-2.5 sm:py-3 mt-6 rounded-lg transition-all duration-300 ease-in-out transform text-sm sm:text-base font-medium hover:scale-[1.02] hover:from-purple-500 hover:to-cyan-400 active:scale-95 focus:outline-none shadow-lg`}
            >
              <span>{loading ? "Signing in..." : "Sign In"}</span>
              {!loading && <GoArrowRight size={18} />}
              {loading && (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-muted-foreground">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="w-full py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 font-medium text-sm"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </form>

          {/* SIGNUP LINK */}
          <p className="text-center text-sm text-white mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white font-semibold hover:underline"
            >
              Create one now
            </Link>
          </p>

          {/* FOOTER */}
          <p className="text-center text-xs text-white/70 mt-4">
            © {new Date().getFullYear()} AURRA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
