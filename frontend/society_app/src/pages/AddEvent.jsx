import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddEvent.css";
import axios from "axios";

const AddEvent = () => {

    const navigate = useNavigate();
    const [eventData, setEventData] = useState({

        title: "",

        description: "",

        date: "",

        startTime: "",

        endTime: "",

        venue: "",

        organizer: "",

        guestName: "",

        eventImage: "",

        category: "General",

        duration: "",

    });
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/events",
                eventData
            );

            alert("Event added successfully!");

            navigate("/events");

        }

        catch (error) {

            console.log(error);

            alert("Failed to add event.");

        }

    };
    return (

        <div className="page">

            <div className="form-container">

                <h1>Add New Event</h1>

                <p>Create and schedule a new society event.</p>

                <form
                    className="event-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Event Title"
                        value={eventData.title}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                title: e.target.value
                            })
                        }
                    />

                    <textarea
                        placeholder="Event Description"
                        rows="5"
                        value={eventData.description}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                description: e.target.value
                            })
                        }
                    />

                    <input
                        type="date"
                        value={eventData.date}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                date: e.target.value
                            })
                        }
                    />

                    <input
                        type="time"
                        value={eventData.startTime}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                startTime: e.target.value
                            })
                        }
                    />
                    <input
                        type="time"
                        placeholder="End Time"
                        value={eventData.endTime}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                endTime: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Venue"
                        value={eventData.venue}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                venue: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Chief Guest"
                        value={eventData.guestName}

                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                guestName: e.target.value
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Organizer"
                        value={eventData.organizer}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                organizer: e.target.value
                            })
                        }
                    />


                    <input
                        type="text"
                        placeholder="Event Image URL"
                        value={eventData.eventImage}
                        onChange={(e) =>
                            setEventData({
                                ...eventData,
                                eventImage: e.target.value,
                            })
                        }
                    />
                    <div className="form-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/events")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="create-btn"
                        >
                            Create Event
                        </button>

                    </div>
                </form>
            </div>

        </div>

    );

};
    
export default AddEvent;