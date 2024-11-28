import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import Bookings from './Bookings';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name : "", email: "", phone : ""
  });

  const callAboutPage = async () => {
    try {

      const response = await fetch('http://localhost:5000/profile', {
        method: "GET",
        headers : {
          Accept: "application/json",
          'Content-Type': "application/json",
        },
        credentials:"include"
      });

      const data = await response.json();
      setUserData(data);

      if (response.status !== 200) {
        throw new Error("Error while getting the response"); // You might want to throw the response data instead of response.error
      }


    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  }

  useEffect(() => {
    callAboutPage();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h3> Hello {userData.name},</h3>
      <br/>
      <Bookings 
        name = {userData.name}
        email = {userData.email}
        phone = {userData.phone}
      />
    </>
  )
}

export default Profile;
