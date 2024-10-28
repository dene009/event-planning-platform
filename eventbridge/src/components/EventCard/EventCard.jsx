import { Link } from 'react-router-dom';
import '../../components/EventCard/EventCard.css';

const EventCard = ({ id, date, heading, location, img }) => {
  const { year, month } = date;

  return (
    <Link to={`/events/${id}`} className="event-card-link">
      <div className="container">
        <div className="card">
          <div className="card-content">
            <img src={img} alt={heading} className="event-image" />
            <h3>{heading}</h3>
            <p>
              <span>Year: {year}</span>
              <span> Month: {month}</span>
            </p>
            <p>{location}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
