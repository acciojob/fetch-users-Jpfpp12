
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://reqres.in/api/users");
      const fetchedUsers = response.data.data;

      if (fetchedUsers.length === 0) {
        setError("No users found.");
      }
      setUsers(fetchedUsers);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
        {/* Do not remove the main div */}
      <h1>User List</h1>
      <button className="btn" onClick={fetchUsers}>
        Get User List
      </button>

      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.avatar} alt={user.first_name} width="50" />
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
