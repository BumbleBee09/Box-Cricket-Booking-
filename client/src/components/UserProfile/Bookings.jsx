import React, { useEffect, useState } from 'react';

const Bookings = (props) => {
  const [bookingData, setBookingData] = useState([]); // Store the retrieved booking data here

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/booking?name=${props.name}&email=${props.email}&phone=${props.phone}`);
      
      // Check if the response is JSON
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json(); // Ensure the response is JSON
      setBookingData(data);
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  }; 
  
  useEffect(() => {
    fetchData();
  }, [props.name, props.email, props.phone]);

  return (
    <div>
      <h2>Your Bookings</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ground Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Timing</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.length > 0 ? (
            bookingData.map((booking, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.groundName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(booking.bdate).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{booking.timing}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
