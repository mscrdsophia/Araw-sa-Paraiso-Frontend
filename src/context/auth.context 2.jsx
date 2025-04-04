import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Current user
  const [loading, setLoading] = useState(true); // Loading state
 const API_URL = import.meta.env.VITE_API_URL; // API URL

  // Function to store the user in localStorage
  const storedToken = (authToken) => {
    localStorage.setItem("authToken", authToken);
    
  };


  const authenticateUser = () => {           //  <==  ADD  
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios.get(
        `${API_URL}/auth/api/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        // If the server verifies that the JWT token is valid  
        const user = response.data;
       // Update state variables        
        setIsLoggedIn(true);
        setLoading(false);
        setUser(user);        
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) 
        // Update state variables         
        setIsLoggedIn(false);
        setLoading(false);
        setUser(null);        
      });      
    } else {
      // If the token is not available (or is removed)
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
        authenticateUser,
        logOutUser,
       // Add the updateUser function
      }}
    >
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
}