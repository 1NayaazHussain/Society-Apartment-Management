import "../styles/Sidebar.css";
import {
  FaHome,
  FaUsers,
  FaUserFriends,
  FaExclamationCircle,
  FaBullhorn,
  FaCalendarAlt,
  FaFileAlt,
  FaCreditCard,
  FaChartBar,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Society Apartment Management</h2>

      <ul className="sidebar-menu">
      <li><FaHome /> Dashboard</li>
<li><FaUsers /> Residents</li>
<li><FaUserFriends /> Visitors</li>
<li><FaExclamationCircle /> Complaints</li>
<li><FaBullhorn /> Notices</li>
<li><FaCalendarAlt /> Events</li>
<li><FaFileAlt /> Documents</li>
<li><FaCreditCard /> Payments</li>
<li><FaChartBar /> Reports</li>
<li><FaCog /> Settings</li>
<li><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;