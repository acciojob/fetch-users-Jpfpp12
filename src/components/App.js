import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);

    axios
      .get("https://reqres.in/api/users", {
        headers: { "x-api-key": "reqres-free-v1" },
      })
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div>
      <button className="btn" onClick={fetchUsers}>
        Get User List
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && !loading && !error ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                {loading || error ? null : "No data found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
