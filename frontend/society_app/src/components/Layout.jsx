import { useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

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
              <p>Society Management System</p>
            </div>

          </div>

          <div className="top-navbar-right">
            {/* We'll move notification and profile here later */}
          </div>

        </div>

        {children}

      </div>

    </div>
  );
}

export default Layout;