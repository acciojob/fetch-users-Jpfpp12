import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    setError(false);

    axios.get('https://reqres.in/api/users?page=1', {
      headers: {
        Authorization: 'Bearer reqres-free-v1',
        'x-api-key': 'reqres-free-v1'
      }
    })
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Axios error:', err);
        setError(true);
        setUsers([]);
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Blue Whales App</h1>

      <button className="btn" onClick={fetchUsers} style={{ marginBottom: '20px', padding: '10px' }}>
        Fetch Users
      </button>

      {loading && <p>Loading...</p>}
      {!loading && error && <p style={{ color: 'red' }}>Failed to fetch users.</p>}
      {!loading && !error && users.length === 0 && <p>No data found</p>}

      {!loading && !error && users.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Avatar</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <img src={user.avatar} alt={user.first_name} width="50" style={{ borderRadius: '50%' }} />
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {user.first_name} {user.last_name}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
