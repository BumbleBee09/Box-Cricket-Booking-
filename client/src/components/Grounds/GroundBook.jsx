import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GroundBook = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name, email, phone, gid } = location.state; // Getting passed data

    // State to store form data
    const [formData, setFormData] = useState({
        name: name || '',
        email: email || '',
        phone: phone || '',
        gid: gid,
        bdate: '',
        selectedSlots: [], // Keep track of selected slots
    });

    const [availableSlots, setAvailableSlots] = useState([]);

    // Fetch available slots from backend
    useEffect(() => {
        const fetchAvailableSlots = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/available-slots/${gid}/${formData.bdate}`
                );
                setAvailableSlots(res.data.availableSlots); // Assume backend sends an array of available slots (0-23)
            } catch (error) {
                console.error("Error fetching available slots:", error);
            }
        };
        if (formData.bdate) fetchAvailableSlots(); // Only fetch when bdate is set
    }, [gid, formData.bdate]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle slot selection change (checkboxes)
    const handleSlotChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const newSelectedSlots = checked
                ? [...prevData.selectedSlots, value]
                : prevData.selectedSlots.filter((slot) => slot !== value);
            return { ...prevData, selectedSlots: newSelectedSlots };
        });
    };

    // Convert slot number to time format (AM/PM)
    const convertSlotToTime = (slot) => {
        const hour = slot % 12; // To get the hour in 12-hour format
        const period = slot < 12 ? 'AM' : 'PM'; // AM for 0-11, PM for 12-23
        const formattedHour = hour === 0 ? 12 : hour; // If it's 0 (midnight), display as 12
        return `${formattedHour}:00 ${period}`;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Data being sent to the backend:", {
            ...formData,
            // bslot: formData.selectedSlots, // Send selected slots as bslot
        });
    
        try {
            const res = await axios.post("http://localhost:5000/bookground", {
                ...formData,
                // bslot: formData.selectedSlots, // Pass selected slots as bslot
            }, {
                headers: { "Content-Type": "application/json" },
            });
    
            if (res.data.error) {
                Swal.fire({
                    title: "Ooops!!!",
                    text: "Invalid Details",
                    icon: "error",
                    confirmButtonText: "Okay",
                });
                navigate("/moreground/:id");
            } else {
                Swal.fire({
                    title: "Congrats!!",
                    text: "Successfully Ground Booked",
                    icon: "success",
                    confirmButtonText: "Okay",
                });
                navigate("/profile");
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again later.",
                icon: "error",
                confirmButtonText: "Okay",
            });
            console.error(error);
        }
    };
    

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h1>Book Ground</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="name" style={{ display: 'block' }}>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email" style={{ display: 'block' }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="phone" style={{ display: 'block' }}>Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="bookingDate" style={{ display: 'block' }}>Booking Date</label>
                    <input
                        type="date"
                        id="bdate"
                        name="bdate"
                        value={formData.bdate}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                    />
                </div>

                <b>Select Available Slots:</b>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', // Responsive grid with dynamic columns
                    gap: '10px',
                    marginBottom: '20px'
                }}>
                    {availableSlots.length > 0 ? (
                        availableSlots.map((slot, index) => (
                            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    id={`slot-${slot}`}
                                    name="selectedSlots"
                                    value={slot}
                                    onChange={handleSlotChange}
                                    style={{ marginBottom: '5px' }}
                                />
                                <label htmlFor={`slot-${slot}`} style={{ fontSize: '12px' }}>
                                    {convertSlotToTime(slot)} {/* Display time format */}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>No slots available for this date.</p>
                    )}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px',
                        }}
                    >
                        Submit Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GroundBook;
