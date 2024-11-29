import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MoreGround = () => {
  const pathname = window.location.pathname;
  const parts = pathname.split('/');
  const id = parts[parts.length - 1];

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "", email: "", phone: ""
  });

  const callUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/moreground/:id', {
        method: "GET",
        headers: {
          Accept: "application/json",
          'Content-Type': "application/json",
        },
        credentials: "include"
      });

      const data = await response.json();
      setUserData(data);

      if (response.status !== 200) {
        throw new Error("Error while getting the response");
      }

    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  const [gdata, setGdata] = useState({});

  useEffect(() => {
    fetchData();
    callUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/grounds/${id}`);
      setGdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const location = `https://www.google.co.in/maps/search/${gdata.name}, ${gdata.city}/@20.945302,72.9342447,15z/data=!3m1!4b1?entry=ttu`;

  const handleBookGround = () => {
    // Navigate to GroundBook component and pass the necessary props
    navigate('/groundbook', { state: { 
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      gid: id 
    }});
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: "1.5",
            backgroundImage: `url(${gdata.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        ></div>
        <div style={{ flex: "1.5", marginLeft: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "5%",
            }}
          >
            <h1 style={{ display: "inline" }}>{gdata.name}</h1>
            <h5 style={{ marginRight: "5%" }}>{gdata.Ratings}⭐ Ratings</h5>
          </div>
          <a href={location} target='_blank' rel='noreferrer'>
            <h5 style={{ margin: "5%" }}>
              {gdata.location}, {gdata.city}
            </h5>
          </a>
          <h2 style={{ margin: "5%" }}>Rs. {gdata.price}</h2>
          <h6 style={{ margin: "5%" }}>{gdata.Description} Description</h6>

          <div style={{ margin: "5%" }}>
            {/* Button to navigate to GroundBook component */}
            <button 
              onClick={handleBookGround} 
              style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
              Book Ground
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreGround;
