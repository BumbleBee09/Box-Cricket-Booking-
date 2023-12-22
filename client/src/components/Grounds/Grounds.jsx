import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import GroundLayout from './GroundLayout'; 
import Loading from '../Loading';


const Grounds = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      
      const response = await axios.get('http://localhost:5000/grounds');
      setLoading(false);
      // The data is now in the `response.data` variable
      setData( await response.data);      
    } catch (error) {
      console.log("Error" + error);
    }

  };

  if(loading){
    return <Loading />
  }
  return (
    <>
    <GroundLayout data={data} />
    </>
  )
}

export default Grounds