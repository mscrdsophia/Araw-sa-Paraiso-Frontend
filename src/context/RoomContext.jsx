import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


// Create and export context
export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "https://araw-sa-paraiso-backend.onrender.com/api/rooms"
        );
        setRooms(response.data);
        setFilteredRooms(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const value = {
    rooms,
    setRooms,
    filteredRooms,
    setFilteredRooms,
    loading,
    error
  };

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
};