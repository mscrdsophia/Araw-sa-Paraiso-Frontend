import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, isBefore, isAfter, isSameDay, isWithinInterval, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';


const StyleDatePicker = () => {
  // State management
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [error, setError] = useState(null);
  const [specialRequests, setSpecialRequests] = useState('');
  const { roomId, userId } = useParams(); // Extract roomId and userId from URL parameters


  const [guests, setGuests] = useState({
    adults: 2,
    children: 0
  });
  const API_URL = import.meta.env.VITE_API_URL;
  // Fetch bookings from API
  useEffect(() => {


    const fetchBookings = async () => {
      const storedToken = localStorage.getItem('authToken');

      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/bookings`, { headers: { Authorization: `Bearer ${storedToken}`} });
        if (!response.ok) throw new Error('Failed to fetch bookings');
        
        const data = await response.json();
        const formattedBookings = data.map(booking => ({
          checkIn: new Date(),
          checkOut: new Date(),
          roomId: booking.roomId
        }));
        
        setBookings(formattedBookings);
      } catch (err) {
        setError('Failed to load booking data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Check if date is booked
  const isDateBooked = (date) => {
    return bookings.some(booking => 
      isWithinInterval(date, {
        start: booking.checkInDate,
        end: booking.checkOutDate
      }) && booking.roomId === roomId
    );
  };

  // Handle date selection
  const handleDateClick = (date) => {
    if (isDateBooked(date)) return;

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else if (isBefore(date, checkInDate)) {
      setCheckInDate(date);
    } else {
      setCheckOutDate(date);
    }
  };

  // Month navigation
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Create booking
  const handleBookNow = async () => {
    console.log("working")
    // if (!checkInDate || !checkOutDate || !userId || !roomId) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,

        },
        body: JSON.stringify({
          // checkinDate: { $date: { $numberLong: checkInDate.toISOString()} },
          // checkoutDate: { $date: { $numberLong: checkOutDate.toISOString()} },
          // request: specialRequests,
          // userId: { $oid: userId },
          // roomId: [{ $oid: roomId }],
          checkinDate:checkInDate.toISOString(),
          checkoutDate:checkOutDate.toISOString(),
          request: specialRequests,
          userId: userId,
          roomId: roomId,
          adultGuest: guests.adults,
          childrenGuest: guests.children
        })
      });

      if (!response.ok) throw new Error('Booking failed');

      const result = await response.json();
      console.log(result);
      setBookingResult(result);
      
      // Refresh bookings
      
      const updatedResponse = await fetch(`${API_URL}/api/bookings`, { headers: { Authorization: `Bearer ${storedToken}`} });
      const updatedData = await updatedResponse.json();
      setBookings(updatedData.map(b => ({
        checkIn: new Date(parseInt(b.checkinDate)),
        checkOut: new Date(parseInt(b.checkoutDate)),
        roomId: b.roomId
      })));
    } catch (err) {
      setError(err.message || 'Failed to complete booking');
    } finally {
      setIsLoading(false);
    }
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = Array.from({ length: startDay }, (_, i) => {
      const day = prevMonthLastDay - startDay + i + 1;
      return new Date(year, month - 1, day);
    });

    // Current month days
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => 
      new Date(year, month, i + 1)
    );

    // Next month days
    const totalDaysShown = prevMonthDays.length + currentMonthDays.length;
    const nextMonthDaysToShow = totalDaysShown <= 35 ? 35 - totalDaysShown : 42 - totalDaysShown;
    const nextMonthDays = Array.from({ length: nextMonthDaysToShow }, (_, i) => 
      new Date(year, month + 1, i + 1)
    );

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays].map((date, index) => {
      const isCurrentMonth = date.getMonth() === month;
      const isBooked = isDateBooked(date);
      const isInRange = checkInDate && checkOutDate && 
                       isAfter(date, checkInDate) && 
                       isBefore(date, checkOutDate);
      const isStart = checkInDate && isSameDay(date, checkInDate);
      const isEnd = checkOutDate && isSameDay(date, checkOutDate);
      const isDisabled = !isCurrentMonth || isBooked || 
                        isBefore(date, new Date()) ||
                        (checkInDate && !checkOutDate && isBefore(date, checkInDate));

      return (
        <div
          key={index}
          onClick={() => !isDisabled && handleDateClick(date)}
          className={`py-2 border border-transparent text-center
            ${isCurrentMonth ? 'text-gray-800' : 'text-gray-300'}
            ${isDisabled ? 'cursor-default' : 'cursor-pointer hover:border-gray-300'}
            ${isInRange ? 'bg-gray-100' : ''}
            ${isStart || isEnd ? 'bg-black text-white' : ''}
            ${isBooked ? 'line-through text-gray-400' : ''}`}
        >
          {date.getDate()}
        </div>
      );
    });
  };

  return (
    <div className="font-sans text-gray-800 max-w-4xl mx-auto mt-16">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl tracking-widest font-light mb-2">Araw sa Paraiso</h1>
        <h2 className="text-xl font-light">Select your dates </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendar Section */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm uppercase tracking-wider mb-2">Arrival</h3>
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                excludeDates={bookings.filter(b => b.roomId === roomId).map(b => b.checkIn)}
                placeholderText="Select date"
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-wider mb-2">Departure</h3>
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate || addDays(new Date(), 1)}
                excludeDates={bookings.filter(b => b.roomId === roomId).map(b => b.checkOut)}
                placeholderText="Select date"
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              />
            </div>
          </div>

          {/* Calendar Display */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
                disabled={isLoading}
              >
                &larr;
              </button>
              <h3 className="text-lg font-light">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
                disabled={isLoading}
              >
                &rarr;
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs uppercase py-2">{day}</div>
              ))}
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        {/* Guest Selection */}
        <div className="md:w-64">
          <h3 className="text-lg font-light mb-4">Guests</h3>
          
          <div className="mb-4">
            <label className="block text-sm mb-1">Adults</label>
            <select 
              value={guests.adults}
              onChange={(e) => setGuests({...guests, adults: parseInt(e.target.value)})}
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              disabled={isLoading}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} Adult{num !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm mb-1">Children</label>
            <select 
              value={guests.children}
              onChange={(e) => setGuests({...guests, children: parseInt(e.target.value)})}
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 bg-transparent"
              disabled={isLoading}
            >
              {[0, 1, 2, 3].map(num => (
                <option key={num} value={num}>{num} Child{num !== 1 ? 'ren' : ''}</option>
              ))}
            </select>
          </div>

          {/* Special Requests */}
          <div className="mb-6">
            <label className="block text-sm mb-1">Special Requests</label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Extra blanket, late checkout, etc."
              disabled={isLoading}
            />
          </div>

          <button 
            className={`w-full py-3 bg-black text-white hover:bg-gray-800 transition duration-200 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            onClick={handleBookNow}
            disabled={!checkInDate || !checkOutDate || isLoading}
          >
            {isLoading ? 'Processing...' : 'Book Now'}
          </button>

          {/* Display booking result or error */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          {bookingResult && (
            <div className="mt-4 p-3 bg-green-50 text-green-600 text-sm">
              Booking confirmed! Reference: {bookingResult._id}
            </div>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default StyleDatePicker;