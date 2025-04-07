import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Logo from "../assets/Logo 2.png";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const { storedToken } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;



  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    axios.post(`${API_URL}/auth/api/login`, { email, password })
      .then((response) => {
        
        storedToken(response.data.authToken);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
       
      });
}

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative absolute inset-0  bg-opacity-10 backdrop-blur-sm " 
              style={{
                  backgroundImage: `url(${Logo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
              }}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
        
          <form className="flex flex-col" onSubmit={handleLoginSubmit}>
            <input 
              type="email" 
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
              placeholder="Email address" 
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              required
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
              placeholder="Password" 
            />
            <div className="flex items-center justify-between flex-wrap">
              <label htmlFor="remember-me" className="text-sm text-gray-900 cursor-pointer">
                <input type="checkbox" id="remember-me" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>
            <p className="text-gray-900 mt-4">Don't have an account?  
              <Link to="/signup" className="text-sm text-blue-500 hover:underline">Sign up</Link>
            </p>
            <button type="submit" className=" bg-black text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
              Login
            </button>
          </form>
       
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
} 

export default LogIn;
