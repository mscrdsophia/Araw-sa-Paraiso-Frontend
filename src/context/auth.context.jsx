import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Current user
  const [loading, setLoading] = useState(true); // Loading state
  const [authToken, setAuthToken] = useState(null);
 const API_URL = import.meta.env.VITE_API_URL; // API URL

  // Function to store the user in localStorage
  const storedToken = (token) => {
    localStorage.setItem("authToken", token);
    console.log("Token in localStorage:", localStorage.getItem("authToken"));
    setAuthToken(token)
    
  };


  const authenticateUser = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      axios.get(
        `${API_URL}/auth/api/verify`, 
        { headers: { Authorization: `Bearer ${token}`} }
      )
      .then((response) => {
        const user = response.data;
        setIsLoggedIn(true);
        setLoading(false);
        setUser(user); // Store the complete user object
        console.log("Authenticated user:", user);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setLoading(false);
        setUser(null);    
        console.error("Error verifying token:", error);
      });      
    } else {
      setIsLoggedIn(false);
      setLoading(false);
      setUser(null);    
    }   
  }

  // Function to logout the user
  const logOutUser = () => {
    localStorage.removeItem("authToken"); // Clear localStorage
    authenticateUser(); // Re-check authentication status
  };

 

  // Check for user authentication status on initial load
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,// Providing users data
        loading,
        isLoggedIn, // Provide isLoggedIn
        storedToken,
        authToken,
        authenticateUser,
        logOutUser,
       // Add the updateUser function
      }}
    >
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
}