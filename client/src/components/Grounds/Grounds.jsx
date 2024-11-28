import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GroundLayout from './GroundLayout'; 
import Loading from '../Loading';

import { useCallback } from 'react';

const Grounds = () => {
  const { city } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/grounds');
      let groundsData = response.data;

      if (city) {
        groundsData = groundsData.filter((ground) => ground.city.toLowerCase() === city.toLowerCase());
      }

      setData(groundsData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data: ", error);
      setLoading(false);
    }
  }, [city]); // Include `city` as a dependency

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Now it's safe to include `fetchData` as a dependency

  if (loading) {
    return <Loading />;
  }

  return <GroundLayout data={data} />;
};

export default Grounds;

