import React from 'react'
import { useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const Logout = () => {

    const {dispatch} = useContext(UserContext);

    const navigate = useNavigate();

    const callLogoutPage = async () => {
        try {
    
          const response = await fetch('http://localhost:5000/logout', {
            method: "GET",
            headers : {
              Accept: "application/json",
              'Content-Type': "application/json",
            },
            credentials:"include"
          });
    
          if (response.status !== 200) {
            throw new Error("Error while getting the response"); // You might want to throw the response data instead of response.error
          }
          else{
            dispatch({type: "USER", payload: false})
            navigate("/login");
          }
    
    
        } catch (error) {
          console.error(error);
        }
      }
    
      useEffect(() => {
        callLogoutPage();
      }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
    </>
  )
}

export default Logout
