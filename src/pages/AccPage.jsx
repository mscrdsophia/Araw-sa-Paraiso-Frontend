import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { AuthContext } from "../context/auth.context";

function AccPage() {
  const { userId } = useParams(); // Retrieve userId from route parameters
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "", // Change from "phone" to "phoneNumber"
  });
  const [bookings, setBookings] = useState([]); // State to store user bookings

  const { authToken, setStoredToken } = useContext(AuthContext); // Ensure setStoredToken is destructured
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  console.log("API URL:", API_URL); // Debug API URL
  console.log("Auth Token present:", localStorage.getItem("authToken")); // Check if token exists
  console.log("User ID from route:", userId); // Debug userId

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleUpdateProfile = () => {
    console.log("currentUser:", currentUser); // Debugging line
    if (!currentUser) return;

    setIsLoading(true);
    axios
      .put(
        `${API_URL}/api/users/${currentUser._id}`, // Use _id instead of id
        updateFormData, // Send updateFormData directly
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      .then((response) => {
        setCurrentUser(response.data);
        setIsLoading(false);
        alert("Profile updated successfully");
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || "Error updating profile";
        console.error("Error updating user:", error);
        setError(errorMsg);
        setIsLoading(false);
        alert(errorMsg);
      });
  };

  const handleDeleteAccount = () => {
    if (
      !currentUser ||
      !confirm("Are you sure you want to delete your account? This action cannot be undone.")
    ) {
      return;
    }

    console.log("Deleting account for user ID:", currentUser._id); // Debug user ID
    console.log("Auth Token:", authToken); // Debug auth token

    setIsLoading(true);
    axios
      .delete(`${API_URL}/api/users/${currentUser._id}`, {
        headers: { Authorization: `Bearer ${authToken}` }, // Ensure token is sent
      })
      .then(() => {
        alert("Account deleted successfully");
        setStoredToken(null); // Clear the stored token
        setCurrentUser(null); // Clear the current user state
        setIsLoading(false); // Ensure loading state is reset
       
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || "Error deleting account";
        console.error("Error deleting account:", error); // Log the error
        setError(errorMsg);
        setIsLoading(false);
         navigate("/"); 
      });
  };

  const handleLogout = () => {
    setStoredToken(null); // Clear the stored token
    setCurrentUser(null); // Clear the current user state
    navigate("/");
  };

  // Try alternate API endpoints if needed
  const fetchUserByEndpoints = async () => {
    setIsLoading(true);
    setError(null);

    if (!authToken) {
      setError("No authentication token available");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      console.log("User data fetched successfully:", response.data);

      const user = response.data;
      if (user) {
        setCurrentUser(user);
        setUpdateFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber || "", // Update to match backend field
        });
      } 
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error fetching user data";
      console.error("Error fetching user data:", err);
     
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user bookings
  const fetchUserBookings = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/api/bookings/user/${userId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setBookings(response.data); // Store bookings in state
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error fetching bookings";
      console.error("Error fetching bookings:", err);
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserByEndpoints();
    fetchUserBookings(); // Fetch bookings when component loads
  }, [authToken, userId]); // Add userId as a dependency

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Account</h2>
        
        {isLoading ? (
          <div className="text-center py-4">
            <p>Loading user data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4">
        
            <div className="mt-4 p-4 bg-gray-100 rounded text-left">
              <p className="font-bold">Debugging Information:</p>
              <p>API URL: {API_URL}</p>
              <p>Auth Token Present: {authToken ? "Yes" : "No"}</p>
              {authToken && (
                <p>Token Format: {authToken.length > 10 ? "Looks valid" : "Possibly invalid"}</p>
              )}
            </div>
            <div className="mt-4">
              <button
                onClick={fetchUserByEndpoints}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
              >
                Retry
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Go to Login
              </button>
            </div>
          </div>
        ) : currentUser ? (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Account Information</h3>
              <p><strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Phone:</strong> {currentUser.phoneNumber || "Not provided"}</p>
              <p className="text-xs text-gray-500 mt-2">User ID: {currentUser._id}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Update Profile</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={updateFormData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={updateFormData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={updateFormData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phoneNumber" // Update name to "phoneNumber"
                    value={updateFormData.phoneNumber} // Update to match state
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                  />
                </div>
                <button
                  onClick={handleUpdateProfile}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                disabled={isLoading}
              >
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Logout
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">My Bookings</h3>
              {isLoading ? (
                <p>Loading bookings...</p>
              ) : bookings.length > 0 ? (
                <ul className="space-y-4">
                  {bookings.map((booking) => (
                    <li key={booking._id} className="p-4 bg-gray-50 rounded-lg">
                      <p><strong>Room ID:</strong> {booking.roomId}</p>
                      <p><strong>Check-in:</strong> {new Date(booking.checkinDate).toLocaleDateString()}</p>
                      <p><strong>Check-out:</strong> {new Date(booking.checkoutDate).toLocaleDateString()}</p>
                      <p><strong>Guests:</strong> {booking.adultGuest} Adults, {booking.childrenGuest} Children</p>
                      <p><strong>Special Requests:</strong> {booking.request || "None"}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No bookings found.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-red-500">Unable to load user data. Please log in again.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccPage;
