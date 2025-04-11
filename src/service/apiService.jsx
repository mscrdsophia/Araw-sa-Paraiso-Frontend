// src/services/apiService.js

const API_URL = import.meta.env.VITE_API_URL;

export const fetchBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/bookings`);
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
    const data = await response.json();
    return data.map(booking => ({
      checkIn: new Date(booking.checkinDate.$date.$numberLong),
      checkOut: new Date(booking.checkoutDate.$date.$numberLong),
      roomId: booking.roomId[0].$oid // Assuming one room per booking
    }));
  } catch (error) {
    return [];
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkinDate: { $date: { $numberLong: bookingData.checkIn.getTime().toString() } },
        checkoutDate: { $date: { $numberLong: bookingData.checkOut.getTime().toString() } },
        request: bookingData.specialRequests || '',
        userId: { $oid: bookingData.userId },
        roomId: [{ $oid: bookingData.roomId }]
      })
    });
    if (!response.ok) {
      throw new Error('Booking creation failed');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};