import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Residents.css";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaEdit,
  FaTrash,
  FaArrowLeft
} from "react-icons/fa";

const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [search, setSearch] = useState("");

  const fetchResidents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/residents");
      setResidents(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching residents:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resident?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/residents/${id}`
      );

      fetchResidents();

    } catch (error) {

      console.log(error);

      alert("Failed to delete resident");
    }
  };
  const filteredResidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(search.toLowerCase()) ||
    resident.flatNo.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="page">
      <div className="page-header">

        <div>

          <span className="header-tag">
            RESIDENT MANAGEMENT
          </span>

          <h2>Residents</h2>

          <p>
            Manage, monitor and organize all society residents from one place.
          </p>

        </div>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

      </div>
      <div className="resident-actions">


        {role === "admin" && (
          <button
            className="add-btn"
            onClick={() => navigate("/add-resident")}
          >
            + Add Resident
          </button>
        )}

        <input
          type="text"
          className="search-input"
          placeholder="Search by Name or Flat No..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>
      <div className="stats-container">

        <div className="stat-card">
          <div className="stat-icon"><FaUsers /></div>
          <h2>{residents.length}</h2>
          <p>Total Residents</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">   <FaCheckCircle /></div>
          <h2>
            {
              residents.filter(r => r.status === "Active").length
            }
          </h2>
          <p>Approved</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">    <FaClock /></div>
          <h2>
            {
              residents.filter(r => r.status !== "Active").length
            }
          </h2>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">    <FaSearch /></div>
          <h2>{filteredResidents.length}</h2>
          <p>Search Results</p>
        </div>



      </div>
      {loading ? (
        <p>Loading residents...</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Flat No</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                {role === "admin" && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filteredResidents.map((r, index) => (
                <tr key={r._id}>
                  <td>{index + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.flatNo}</td>
                  <td>{r.phone}</td>
                  <td>{r.email}</td>
                  <td>

                    <span
                      className={`status-badge ${r.status.toLowerCase()}`}
                    >
                      {r.status}
                    </span>

                  </td>
                  {role === "admin" && (
                    <td>
                        <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => navigate(`/edit-resident/${r._id}`)}
                      >
                        <FaEdit />Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(r._id)}
                      >
                        <FaTrash />  Delete
                      </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default Residents;