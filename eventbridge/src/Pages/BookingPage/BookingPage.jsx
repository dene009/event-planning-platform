import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../api.js"; // Import fetchWithAuth from api.js
import './BookingPage.css';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  // Redirect to login if token is missing
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to access the booking page.");
      navigate("/login", { state: { from: `/booking/${id}` } });
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetchWithAuth(`/api/book-event/${id}`, {
        method: "POST",
        body: JSON.stringify({ ...formData, eventId: id }),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      const result = await response.json();
      alert(result.message);
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
