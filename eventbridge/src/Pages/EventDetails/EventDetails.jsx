import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import React, { useState, useEffect } from 'react';
import { eventList } from "../../utils/EventDatabase.jsx";
import Navigation from "../../components/Navigation/Navigation";
import { MdCalendarMonth } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();  // Get the dynamic id from the URL
  const numId = Number(id);     // Convert id to a number if necessary
  const navigate = useNavigate();  // Hook to navigate programmatically
  const [filteredEvent, setFilteredEvent] = useState(null);  // Initial state is null
  const [loading, setLoading] = useState(true);  // State to handle loading

  useEffect(() => {
    const foundEvent = eventList.find(eventDetail => eventDetail.id === numId);
    if (foundEvent) {
      setFilteredEvent(foundEvent);  // Set event if found
    }
    setLoading(false);  // Set loading to false after attempting to find the event
  }, [numId]);

  if (loading) {
    return <div>Loading...</div>;  // Loading message while event is being fetched
  }

  if (!filteredEvent) {
    return <div>Event not found!</div>;  // Fallback if event is not found
  }

  // Handle booking click to navigate to the booking page
  const handleBookingClick = () => {
    navigate(`/booking/${filteredEvent.id}`);
  };

  return (
    <div className="event-details-container">
      <Navigation />
      <div className="event-details-wrapper">
        <img src={filteredEvent.img} alt="Event" />
        <div className="event-details-content">
          <h3>Event Name: {filteredEvent.heading}</h3>
          <div className="small-details">
            <p className="date">
              <MdCalendarMonth className="icon" />
              <span className="font-weight-med">{filteredEvent.date.month}</span>
              <span className="font-weight-med">{filteredEvent.date.year}</span>
            </p>
            <p className="location font-weight-med">
              <IoLocationSharp className="icon" />
              {filteredEvent.location}
            </p>
          </div>
          <p className="description">
            <span className="description-heading">Event Description:</span>
            <span className="description-heading-para">
              {filteredEvent.description}
            </span>
          </p>
          
          {/* Book Event Button */}
          <button className="book-event-button" onClick={handleBookingClick}>
            Book Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
