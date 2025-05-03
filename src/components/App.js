import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=1', {
      headers: {
        Authorization: 'Bearer reqres-free-v1'
      }
    })
      .then((response) => {
        setUsers(response.data.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error('Axios error:', err);
        setError(true);
        setUsers([]); // fallback to empty list
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Blue Whales App</h1>

      {loading && <p>Loading...</p>}

      {!loading && error && <p style={{ color: 'red' }}>Failed to fetch users.</p>}

      {!loading && !error && users.length === 0 && <p>No data found</p>}

      {!loading && !error && users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <img src={user.avatar} alt={user.first_name} width="50" style={{ borderRadius: '50%' }} />
              <span style={{ marginLeft: '10px' }}>
                {user.first_name} {user.last_name} ({user.email})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
