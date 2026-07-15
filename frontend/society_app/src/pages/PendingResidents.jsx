import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Residents.css";
import { useNavigate } from "react-router-dom";

const PendingResidents = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchPendingUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/pending"
      );

      setUsers(res.data);
      setLoading(false);

    } catch (error) {

      console.log(error);
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApprove = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/users/approve/${id}`
      );

      fetchPendingUsers();

      alert("Resident Approved Successfully");

    } catch (error) {

      console.log(error);
      alert("Failed to approve resident");

    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.flatNo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">

      <h2>Pending Resident Approvals</h2>

      <button
        className="dashboard-btn"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>

      <div className="resident-actions">

        <input
          type="text"
          className="search-input"
          placeholder="Search by Name or Flat No..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {loading ? (
        <p>Loading pending residents...</p>
      ) : (
        <div className="table-container">
          <table>

            <thead>
              <tr>
                <th>Name</th>
                <th>Flat No</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user) => (
                <tr key={user._id}>

                  <td>{user.fullName}</td>
                  <td>{user.flatNo}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleApprove(user._id)}
                    >
                      Approve
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      )}

    </div>
  );
};

export default PendingResidents;