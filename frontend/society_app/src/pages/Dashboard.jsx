import Sidebar from "../components/Sidebar";
import StatCard from "../components/statCard";
import RecentComplaints from "../components/RecentComplaints";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaClipboardCheck,
  FaUsers,
  FaUserFriends,
  FaExclamationCircle,
  FaCreditCard
} from "react-icons/fa";

function Dashboard() {
  const [residentCount, setResidentCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const role = localStorage.getItem("role");

  const fullName = localStorage.getItem("fullName");

  const flatNo = localStorage.getItem("flatNo");

  const navigate = useNavigate();

  const fetchProfileImage = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/settings"
      );

      if (res.data.profileImage) {

        setProfileImage(
          `http://localhost:5000/uploads/${res.data.profileImage}`
        );

      }

    } catch (error) {

      console.log(error);

    }

  };
  const fetchComplaints = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );

      setComplaints(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchResidents();
    fetchVisitors();
    if (role === "admin") {
      fetchPendingUsers();
    }
    fetchProfileImage();
    fetchComplaints();

  }, []);

  const fetchResidents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/residents"
      );

      setResidentCount(res.data.length);

    } catch (error) {
      console.log(error);
    }
  };
  const fetchVisitors = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/visitors"
      );

      setVisitorCount(res.data.length);

    } catch (error) {
      console.log(error);
    }
  };
  const fetchPendingUsers = async () => {
    try {

        const res = await axios.get(
          "http://localhost:5000/api/users/pending"
        );
        console.log("Fetched pending users:", res.data);
        // Ensure each user has required fields to avoid UI crashes
        const sanitized = res.data.map(u => ({
          ...u,
          flatNo: u.flatNo || "",
          phone: u.phone || "",
          email: u.email || "",
          fullName: u.fullName || ""
        }));
        // setPendingUsers(res.data); // removed duplicatenitized);
        setPendingUsers(sanitized);
    } catch (error) {

      console.log(error);

    }
  };
  const handleApprove = async (id) => {

    const confirmApprove = window.confirm(
      "Are you sure you want to approve this resident?"
    );

    if (!confirmApprove) return;

    try {

      const res = await axios.put(
        `http://localhost:5000/api/users/approve/${id}`
      );

      alert(res.data.message);

      fetchPendingUsers();
      // Force reload to update Residents table
      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Failed to approve resident");

    }

  };
  const handleReject = async (id) => {

    const confirmReject = window.confirm(
      "Are you sure you want to reject this resident?"
    );

    if (!confirmReject) return;

    try {

      const res = await axios.put(
        `http://localhost:5000/api/users/reject/${id}`
      );

      alert(res.data.message);

      fetchPendingUsers();

    } catch (error) {

      console.log(error);

      alert("Failed to reject resident");

    }

  };
  return (
    <div className="dashboard-container">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen} />
      <div className="main-content">
        <div className="top-navbar">
          <div className="top-navbar-title-wrapper">

            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>

            <div className="top-navbar-title">
              <h3>Gokuldham Society</h3>
            </div>
          </div>

          <div className="top-navbar-right">

            {role === "admin" && (
              <div className="notification-wrapper">

                <button
                  className="notification-btn"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  🔔
                  {pendingUsers.length > 0 && (
                    <span className="notification-badge">
                      {pendingUsers.length}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="notification-panel">
                    <h4>Notifications</h4>

                    {pendingUsers.length === 0 ? (

                      <p>No new notifications</p>

                    ) : (

                      pendingUsers.map((user) => (

                        <div
                          key={user._id}
                          className="notification-card"
                        >
                          <h5>👤 New Resident Registration</h5>

                          <p className="notification-message">
                            <strong>{user.fullName}</strong> has requested to join the society.
                          </p>

                          <div className="notification-actions">

                            <button
                              className="view-btn"
                              onClick={() => {
                                console.log("View clicked");
                                console.log(user);
                                setSelectedUser(user);
                                setShowModal(true);
                              }}
                            >
                              View
                            </button>
                            <button
                              className="approve-btn"
                              onClick={() => handleApprove(user._id)}
                            >
                              Approve
                            </button>

                            <button
                              className="reject-btn"
                              onClick={() => handleReject(user._id)}
                            >
                              Reject
                            </button>

                          </div>

                        </div>

                      ))

                    )}

                  </div>
                )}

              </div>
            )}

            <div className="profile-btn" onClick={() => navigate("/settings")}>

              <div className="profile-avatar">

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="navbar-profile-image"
                  />
                ) : (
                  role === "admin" ? "S" : "R"
                )}

              </div>

              {role === "admin" ? (

                <span>Secretary</span>

              ) : (

                <div className="profile-info">

                  <span className="profile-name">
                    {fullName}
                  </span>

                  <small className="profile-role">
                    {flatNo} | Resident
                  </small>

                </div>

              )}

            </div>

          </div>

        </div>
        <div className="dashboard-header">
          <svg
            className="header-border-svg"
            viewBox="0 0 1000 260"
            preserveAspectRatio="none"
          >
            <rect
              className="border-path"
              x="4"
              y="4"
              width="992"
              height="252"
              rx="22"
              ry="22"
            />

            <rect
              className="border-light"
              x="4"
              y="4"
              width="992"
              height="252"
              rx="22"
              ry="22"
            />
          </svg>
          <div className="header-content">
            <span className="header-tag">
              {role === "admin" ? "ADMIN PANEL" : "RESIDENT PANEL"}
            </span>

            <h2>
              {role === "admin"
                ? "Society Dashboard"
                : "Resident Dashboard"}
            </h2>

            <p>
              {role === "admin"
                ? "Manage residents, visitors and society operations from one place."
                : "View notices, events and your society information from one place."}
            </p>

          </div>

        </div>
        <div className="cards-container">
          <StatCard
            title="Total Residents"
            value={residentCount}
            icon={<FaUsers />}
            subtitle="Active Residents"
          />

          <StatCard
            title="Active Complaints"
            value={complaints.length}
            icon={<FaExclamationCircle />}
            subtitle={
              complaints.length === 0
                ? "No Complaints"
                : "Open Complaints"
            }
          />

          <StatCard
            title="Visitors"
            value={visitorCount}
            icon={<FaUserFriends />}
            subtitle="Today's Visitors"
          />

          <StatCard
            title="Pending Payments"
            value="0"
            icon={<FaCreditCard />}
            subtitle="No Due Payments"
          />
        </div>
      <RecentComplaints complaints={complaints} />
      </div>
      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h2>Resident Details</h2>

            <div className="detail-row">
              <FaUser className="detail-icon" />
              <div>
                <span>Name</span>
                <p>{selectedUser.fullName}</p>
              </div>
            </div>

            <div className="detail-row">
              <FaBuilding className="detail-icon" />
              <div>
                <span>Flat Number</span>
                <p>{selectedUser.flatNo}</p>
              </div>
            </div>

            <div className="detail-row">
              <FaEnvelope className="detail-icon" />
              <div>
                <span>Email Address</span>
                <p>{selectedUser.email}</p>
              </div>
            </div>

            <div className="detail-row">
              <FaPhone className="detail-icon" />
              <div>
                <span>Phone Number</span>
                <p>{selectedUser.phone}</p>
              </div>
            </div>

            <div className="detail-row">
              <FaClipboardCheck className="detail-icon" />
              <div>
                <span>Status</span>
                <p>{selectedUser.status}</p>
              </div>
            </div>

            <div className="modal-buttons">
              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>


  );
}

export default Dashboard;