import React, { useEffect, useState } from 'react';

const Bookings = (props) => {
  const [bookingData, setBookingData] = useState([]); // Store the retrieved booking data here

  useEffect(() => {
    // Make a GET request to retrieve booking data based on props (name, email, phone)
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bookings?name=${props.name}&email=${props.email}&phone=${props.phone}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            'Content-Type': "application/json",
          },
          credentials: "include"
        });

        if (response.status !== 200) {
          throw new Error("Error while getting the response");
        }

        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [props.name, props.email, props.phone]); // Add props as dependencies to update the data when props change

  return (
    <>
      {/* Render the booking data in the component */}
      <h2>Your Bookings</h2>
      <ul>
        {bookingData.map((booking, index) => (
          <li key={index}>{/* Render booking information here */}</li>
        ))}
      </ul>
    </>
  );
}

export default Bookings;
