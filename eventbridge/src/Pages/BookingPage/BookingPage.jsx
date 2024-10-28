import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import './BookingPage.css';

const BookingPage = () => {
  const { id } = useParams();  // Get the event ID from the URL

  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // Send booking data to the server
      const response = await fetch(`http://localhost:5001/api/book-event/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include JWT token in the header
        },
        body: JSON.stringify({ ...formData, eventId: id }),  // Send form data along with event ID
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      const result = await response.json();
      alert(result.message); // Confirm the booking to the user
    } catch (error) {
      console.error("Error booking event:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="booking-page">
      <h2>Book Event ID: {id}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <button type="submit" className="submit-button">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
