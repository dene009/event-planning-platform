import EventCard from '../../components/EventCard/EventCard.jsx';
import { eventList } from "../../utils/EventDatabase.jsx";  
import '../../components/EventCard/EventCard.css';
import Navigation from '../../components/Navigation/Navigation.jsx';

const EventList = ()=>{
    const renderEventCards = ()=>{
        return eventList.map(({id,date,heading,location,img})=>{
            return(
                <EventCard
                    key={id}
                    id={id}
                    date={date}
                    heading={heading}
                    location={location}
                    img={img}
                />
            )
        })
    }

    return (
        <div>
            <Navigation/>
            <div className="event-list-wrapper">
                <div className="event-;ist">
                    {eventList.length>0?(
                    renderEventCards()
                    ):(<p>No event available</p>)}
                </div>
            </div>
            
        </div>
    )

}

export default EventList; 