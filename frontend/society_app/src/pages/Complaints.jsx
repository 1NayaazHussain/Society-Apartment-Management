import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Complaints.css";

const Complaints = () => {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [priorityFilter, setPriorityFilter] = useState("All");

    const [selectedComplaint, setSelectedComplaint] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const fetchComplaints = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/complaints"
            );

            setComplaints(res.data);

            setLoading(false);

        }

        catch (err) {

            console.log(err);

            setLoading(false);

        }

    };
    const handleResolve = async (id) => {

    try {

        await axios.put(

            `http://localhost:5000/api/complaints/${id}`,

            {
                status: "Resolved"
            }

        );

        fetchComplaints();

    }

    catch (error) {

        console.log(error);

        alert("Failed to resolve complaint");

    }

};
const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {

        await axios.delete(

            `http://localhost:5000/api/complaints/${id}`

        );

        fetchComplaints();

    }

    catch (error) {

        console.log(error);

        alert("Failed to delete complaint");

    }

};

    useEffect(() => {

        fetchComplaints();

    }, []);

    const filteredComplaints = complaints.filter((complaint) => {

        const matchesSearch =

            complaint.residentName?.toLowerCase().includes(search.toLowerCase()) ||

            complaint.flatNo?.toLowerCase().includes(search.toLowerCase()) ||

            complaint.category?.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =

            statusFilter === "All" ||

            complaint.status === statusFilter;

        const matchesPriority =

            priorityFilter === "All" ||

            complaint.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;

    });

   return (

<div className="page">

    {/* Header */}
    <div className="complaint-header">


        <div className="complaint-header-left">
   <div className="header-content-card">
            <span className="section-tag">
                COMPLAINT MANAGEMENT
            </span>

            <h1>Complaints</h1>

            <p>
                Track, manage and resolve resident complaints efficiently.
            </p>

      <button
            className="dashboard-btn"
            onClick={() => navigate("/dashboard")}
        >
            Dashboard
        </button>
        </div>
        </div>

  

        <div className="complaint-header-right">

      <img src="/complaint-banner.png" alt="Society" />

</div>

    </div>   {/* ✅ Close complaint-header here */}

    {/* Action Bar */}
    <div className="complaint-actions">


    <button
        className="add-btn"
        onClick={() => navigate("/add-complaint")}
    >
        + Add Complaint
    </button>

    <input
        type="text"
        className="search-input"
        placeholder="Search Resident, Flat No..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
    />

    <select
        className="filter-select"
        value={statusFilter}
        onChange={(e)=>setStatusFilter(e.target.value)}
    >
        <option>All Status</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Resolved</option>
    </select>

    <select
        className="filter-select"
        value={priorityFilter}
        onChange={(e)=>setPriorityFilter(e.target.value)}
    >
        <option>All Priority</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
    </select>

</div>
    <div className="stats-grid">

    <div className="stat-card">

        <h2>{complaints.length}</h2>

        <p>Total Complaints</p>

    </div>

    <div className="stat-card">

        <h2>
            {complaints.filter(c => c.status === "Pending").length}
        </h2>

        <p>Pending</p>

    </div>

    <div className="stat-card">

        <h2>
            {complaints.filter(c => c.status === "In Progress").length}
        </h2>

        <p>In Progress</p>

    </div>

    <div className="stat-card">

        <h2>
            {complaints.filter(c => c.status === "Resolved").length}
        </h2>

        <p>Resolved</p>

    </div>

</div>
{loading ? (

    <p className="loading-text">
        Loading complaints...
    </p>

) : (

<div className="table-container">

<table>

    <thead>

        <tr>

            <th>S.No</th>
            <th>Resident</th>
            <th>Flat No</th>
            <th>Category</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Date</th>

            {role === "admin" && (
                <th>Actions</th>
            )}

        </tr>

    </thead>

    <tbody>

        {filteredComplaints.map((complaint,index)=>(

        <tr key={complaint._id}>

            <td>{index+1}</td>

            <td>{complaint.residentName}</td>

            <td>{complaint.flatNo}</td>

            <td>{complaint.category}</td>

            <td>{complaint.title}</td>

            <td>

                <span
                    className={`priority-badge ${complaint.priority.toLowerCase()}`}
                >
                    {complaint.priority}
                </span>

            </td>

            <td>

                <span
                    className={`status-badge ${complaint.status.toLowerCase().replace(/\s/g,"-")}`}
                >
                    {complaint.status}
                </span>

            </td>

            <td>{complaint.date}</td>

            {role === "admin" && (

            <td className="action-buttons">


      {complaint.status !== "Resolved" && (

        <button
            className="resolve-btn"
            onClick={() => handleResolve(complaint._id)}
        >
            Resolve
        </button>

    )}

    <button
        className="delete-btn"
        onClick={() => handleDelete(complaint._id)}
    >
        Delete
    </button>

            </td>

            )}

        </tr>

        ))}

    </tbody>

</table>

</div>

)}
{showModal && selectedComplaint && (

    <div className="modal-overlay">

        <div className="complaint-modal">

            <h2>{selectedComplaint.title}</h2>

            <p><strong>Resident:</strong> {selectedComplaint.residentName}</p>

            <p><strong>Flat:</strong> {selectedComplaint.flatNo}</p>

            <p><strong>Category:</strong> {selectedComplaint.category}</p>

            <p><strong>Priority:</strong> {selectedComplaint.priority}</p>

            <p><strong>Status:</strong> {selectedComplaint.status}</p>

            <p><strong>Description:</strong></p>

            <p>{selectedComplaint.description}</p>

            <button
                className="close-btn"
                onClick={() => setShowModal(false)}
            >
                Close
            </button>

        </div>

    </div>

)}
</div>

);

};

export default Complaints;