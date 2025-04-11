import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { EyeIcon, EyeOffIcon, UserIcon, KeyIcon } from 'lucide-react';
import Logo from "../assets/Logo 2.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { storedToken, authenticateUser } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/auth/api/login`, { email, password })
    .then((response) => {
      storedToken(response.data.authToken);
      authenticateUser();
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 100);
    })
    .catch((error) => {
      const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(errorMsg);
      
      // Show toast notification based on error type
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status === 404) {
        toast.error("User not found");
      } else {
        toast.error(errorMsg);
      }
    });
}

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <img
              src={Logo}
              alt="Brand logo showing a beach scene with palm tree and sailboat"
              className="h-16 w-16 object-contain"
            />
          </div>
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome to Araw sa Paraiso
            </h1>
            <p className="text-gray-500 mt-2">
              Please enter your details to sign in
            </p>
          </div>
          
          <form onSubmit={handleLoginSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyIcon size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOffIcon size={18} aria-hidden="true" />
                      ) : (
                        <EyeIcon size={18} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Don't have an account?</span>{' '}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </div>
          
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LogIn;