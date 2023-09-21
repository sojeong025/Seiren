import React, { useEffect, useState } from 'react';
import axios from 'axios';

function YourComponent() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const accessToken = localStorage.getItem("accessToken");
  const apiUrl = 'http://192.168.40.134:8080/api/voices';

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios.get(apiUrl, config)
      .then((response) => {
        setApiData(response.data.response);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        setError(error);
        setLoading(false); // Set loading to false on error
      });
  }, [accessToken]);

  // Render loading state while waiting for data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if there's an error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Your Voice</h1>
      <ul>
        {apiData.map((item) => (
          <li key={item.voiceId}>{item.voiceTitle}</li>
        ))}
      </ul>
    </div>
  );
}

export default YourComponent;
