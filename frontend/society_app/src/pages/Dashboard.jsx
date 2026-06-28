import Sidebar from "../components/Sidebar";
import StatCard from "../components/statCard";
import RecentComplaints from "../components/RecentComplaints";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";


function Dashboard() {
  const [residentCount, setResidentCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
 
  useEffect(() => {
    fetchResidents();
    fetchVisitors();
 
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
 return (
 <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-header">
          <h2>Society Dashboard</h2>
          <p>Welcome to the Society Management Platform</p>
        </div>
        <div className="cards-container">
          <StatCard title="Total Residents" value={residentCount} />
          <StatCard title="Active Complaints" value="0" />
          <StatCard title="Visitors Today" value={visitorCount} />
          <StatCard title="Pending Payments" value="0" />
        </div>
        <RecentComplaints />
      </div>
    </div>


  );
}

export default Dashboard;