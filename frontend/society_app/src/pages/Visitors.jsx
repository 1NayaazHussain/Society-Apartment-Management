import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Residents.css";
import { useNavigate } from "react-router-dom";
import {
    FaUsers,
    FaDoorOpen,
    FaDoorClosed,
    FaSearch,
    FaSignOutAlt 
} from "react-icons/fa"

const Visitors = () => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const fetchVisitors = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/visitors"
            );

            setVisitors(res.data);
            setLoading(false);

        } catch (err) {
            console.log("Error fetching visitors:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVisitors();
    }, []);

    const filteredVisitors = visitors.filter((visitor) =>
        visitor.visitorName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        visitor.flatNo
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    const totalVisits = visitors.filter(
        (visitor) =>
            visitor.visitorName
                ?.toLowerCase()
                .includes(search.toLowerCase())
    ).length;
    const handleMarkLeft = async (id) => {
        try {

            await axios.put(
                `http://localhost:5000/api/visitors/${id}/left`
            );

            fetchVisitors();

        } catch (error) {

            console.log(error);

            alert("Failed to update visitor");

        }
    };
    const lastVisit =
        filteredVisitors.length > 0
            ? filteredVisitors[filteredVisitors.length - 1]
            : null;

    return (
        <div className="page">

            <div className="visitor-header">

                <div className="visitor-header-left">

                    <span className="section-tag">
                        VISITOR MANAGEMENT
                    </span>

                    <h1>Visitors</h1>

                    <p>
                        Monitor and manage all visitor entries and exits in your society.
                    </p>

                </div>

                <button
                    className="dashboard-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>

            </div>

            <div className="visitor-actions">

                {role === "admin" && (
                    <button
                        className="add-btn"
                        onClick={() => navigate("/addvisitor")}
                    >
                        + Add Visitor
                    </button>
                )}

                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Visitor or Flat No..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="card-icon blue">
                        <FaUsers />
                    </div>
                    <h2>{visitors.length}</h2>

                    <p>Total Visitors</p>

                </div>

                <div className="stat-card">

                    <div className="card-icon green">
                        <FaDoorOpen />
                    </div>
                    <h2>
                        {visitors.filter(v => v.status === "Inside").length}
                    </h2>

                    <p>Inside Society</p>

                </div>

                <div className="stat-card">

                    <div className="card-icon orange">
                        <FaDoorClosed />
                    </div>
                    <h2>
                        {visitors.filter(v => v.status === "Left").length}
                    </h2>

                    <p>Exited</p>

                </div>

                <div className="stat-card">
                    <div className="card-icon purple">
                        <FaSearch />
                    </div>
                    <h2>{filteredVisitors.length}</h2>

                    <p>Search Results</p>

                </div>

            </div>
            {search && totalVisits > 0 && (
                <div className="visitor-summary">

                    <h3>Visitor Summary</h3>

                    <p>
                        <strong>Total Visits:</strong> {totalVisits}
                    </p>

                    {lastVisit && (
                        <>
                            <p>
                                <strong>Last Visit Date:</strong> {lastVisit.date}
                            </p>

                            <p>
                                <strong>Last Visit Time:</strong> {lastVisit.timeIn}
                            </p>
                        </>
                    )}

                </div>
            )}

            {loading ? (
                <p>Loading visitors...</p>
            ) : (
                <div className="table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Visitor Name</th>
                                <th>Phone</th>
                                <th>Flat No</th>
                                <th>Purpose</th>
                                <th>Date</th>
                                <th>Time In</th>
                                <th>Time Out</th>
                                <th>Status</th>
                                {role === "admin" && <th>Actions</th>}
                            </tr>
                        </thead>

                        <tbody>
                            {filteredVisitors.map((visitor, index) => (
                                <tr key={visitor._id}>
                                    <td>{index + 1}</td>
                                    <td>{visitor.visitorName}</td>
                                    <td>{visitor.phone}</td>
                                    <td>{visitor.flatNo}</td>
                                    <td>{visitor.purpose}</td>
                                    <td>{visitor.date}</td>
                                    <td>{visitor.timeIn}</td>
                                    <td>{visitor.timeOut}</td>
                                    <td>

                                        <span
                                            className={`status-badge ${visitor.status.toLowerCase()}`}
                                        >
                                            {visitor.status}
                                        </span>

                                    </td>
                                    {role === "admin" && (
                                        <td>
                                            {visitor.status === "Inside" && (
                                                <button
                                                    className="left-btn"
                                                    onClick={() => handleMarkLeft(visitor._id)}
                                                >
                                                  <FaSignOutAlt />  Mark Exit
                                                </button>
                                            )}
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

export default Visitors;
