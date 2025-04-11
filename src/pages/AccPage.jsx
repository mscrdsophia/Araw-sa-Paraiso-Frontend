import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import Swal from 'sweetalert2';

function AccPage() {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [bookings, setBookings] = useState([]);
  const [roomsMap, setRoomsMap] = useState({});

  const { authToken, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const showToast = (message, type = "success") => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: type === "success" ? "#4CAF50" : "#F44336",
      stopOnFocus: true,
    }).showToast();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleUpdateProfile = () => {
    if (!currentUser) return;
    setIsLoading(true);
    axios
      .put(
        `${API_URL}/api/users/${currentUser._id}`,
        updateFormData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      .then((response) => {
        setCurrentUser(response.data);
        setIsLoading(false);
        showToast("Profile updated successfully");
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || "Error updating profile";
        setError(errorMsg);
        setIsLoading(false);
        showToast(errorMsg);
      });
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;
  
    // Simple confirmation dialog
    const result = await Swal.fire({
      title: 'Delete account?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });
  
    if (!result.isConfirmed) return;
    setIsLoading(true);
    axios
      .delete(`${API_URL}/api/users/${currentUser._id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then(() => {
        showToast("Account deleted successfully");
        localStorage.removeItem("authToken");
        setCurrentUser(null);
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || "Error deleting account";
        setError(errorMsg);
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    logOutUser();
    navigate("/login");
  };

  const fetchUserByEndpoints = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("authToken");
    if (!authToken) {
      setError("No authentication token available");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = response.data;
      if (user) {
        setCurrentUser(user);
        setUpdateFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber || "",
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error fetching user data";
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("authToken");
    try {
      const [bookingsRes, roomsRes] = await Promise.all([
        axios.get(`${API_URL}/api/bookings/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/api/rooms`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);
      const roomsArray = roomsRes.data;
      const roomMap = {};
      roomsArray.forEach((room) => {
        roomMap[room._id] = room;
      });
      setRoomsMap(roomMap);
      setBookings(bookingsRes.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error fetching bookings";
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: 'Delete Booking?',
      text: "This action cannot be undone!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Keep it'
    });
  
    if (!result.isConfirmed) return;
  
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
      showToast("Booking deleted successfully.");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to delete booking";
      showToast(errorMsg);
    }
  };

  useEffect(() => {
    fetchUserByEndpoints();
    fetchUserBookings();
  }, []);

  const calculateNights = (checkinDate, checkoutDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    return Math.round((checkout - checkin) / oneDay);
  };

  const formatCurrency = (amount) => `₱${Number(amount || 0).toLocaleString()}`;
  
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition"
        >
          ← Back to Homepage
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">My Account</h1>

        {isLoading ? (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : currentUser ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                <ul className="space-y-2 text-sm">
                  <li><strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}</li>
                  <li><strong>Email:</strong> {currentUser.email}</li>
                  <li><strong>Phone:</strong> {currentUser.phoneNumber || "Not provided"}</li>
                  <li className="text-gray-400 text-xs">User ID: {currentUser._id}</li>
                </ul>
              </section>

              <section className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
                <div className="grid gap-4">
                  {["firstName", "lastName", "email", "phoneNumber"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={updateFormData[field]}
                        onChange={handleInputChange}
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleUpdateProfile}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                  >
                    {isLoading ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </section>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <button
                onClick={handleDeleteAccount}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                disabled={isLoading}
              >
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
              >
                Logout
              </button>
            </div>

            <section className="mt-10">
              <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
              {bookings.length > 0 ? (
                <ul className="space-y-4">
                  {bookings.map((booking) => {
                    // Extract roomId correctly (handles both array and object cases)
                    const roomId = Array.isArray(booking.roomId) 
                      ? booking.roomId[0]?.$oid || booking.roomId[0]?._id || booking.roomId[0]
                      : booking.roomId?.$oid || booking.roomId?._id || booking.roomId;
                    
                    const room = roomsMap[roomId];
                    const nights = calculateNights(booking.checkinDate, booking.checkoutDate);
                    const totalPrice = room ? room.roomPrice * nights : 0;

                    return (
                      <li key={booking._id} className="p-4 border border-gray-200 rounded-lg">
                        <p className="font-medium">Room: {room?.roomName || "Unknown Room"}</p>
                        <p className="text-sm text-gray-600">
                          Check-in: {new Date(booking.checkinDate).toLocaleDateString()} <br />
                          Check-out: {new Date(booking.checkoutDate).toLocaleDateString()} <br />
                          Guests: {booking.adultGuest} Adults, {booking.childrenGuest} Children <br />
                          Nights: {nights} <br />
                          Total Price: {formatCurrency(totalPrice)} <br />
                          Special Requests: {booking.request || "None"}
                        </p>
                        <button
                          onClick={() => handleDeleteBooking(booking._id)}
                          className="mt-2 text-sm text-red-500 hover:underline"
                        >
                          Delete Booking
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-500">No bookings found.</p>
              )}
            </section>
          </>
        ) : (
          <p className="text-center text-red-500 py-10">Unable to load user data. Please log in again.</p>
        )}
      </div>
    </div>
  );
}

export default AccPage;