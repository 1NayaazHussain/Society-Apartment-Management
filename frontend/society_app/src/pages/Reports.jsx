import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/Reports.css";
import { useNavigate } from "react-router-dom";
import {
    BarChart,
    Bar,
    PieChart,
    Legend,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer


} from "recharts";
import {
    FaUsers,
    FaUserFriends,
    FaExclamationTriangle,
    FaBullhorn,
    FaCalendarAlt,
    FaClock,
    FaSpinner,
    FaCheckCircle
} from "react-icons/fa";
const Reports = () => {
    const navigate = useNavigate();
    const [reportData, setReportData] = useState({

        residents: 0,

        visitors: 0,

        complaints: 0,

        notices: 0,

        events: 0,

        pendingComplaints: 0,

        inProgressComplaints: 0,

        resolvedComplaints: 0,

        approvedResidents: 0,
        pendingResidents: 0,
        rejectedResidents: 0,
        complaintTrend: []

    });

    const fetchReportData = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/reports"
            );

            setReportData(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchReportData();

    }, []);
    const downloadReport = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Society Apartment Management Report", 14, 20);

        autoTable(doc, {
            startY: 35,
            head: [["Category", "Count"]],
            body: [
                ["Residents", reportData.residents],
                ["Visitors", reportData.visitors],
                ["Complaints", reportData.complaints],
                ["Notices", reportData.notices],
                ["Events", reportData.events],
                ["Pending Complaints", reportData.pendingComplaints],
                ["In Progress Complaints", reportData.inProgressComplaints],
                ["Resolved Complaints", reportData.resolvedComplaints]
            ]
        });

        doc.save("Society_Report.pdf");

    };
    const chartData = [
        {
            name: "Residents",
            count: reportData.residents
        },
        {
            name: "Visitors",
            count: reportData.visitors
        },
        {
            name: "Complaints",
            count: reportData.complaints
        },
        {
            name: "Notices",
            count: reportData.notices
        },
        {
            name: "Events",
            count: reportData.events
        }
    ];
    const pieData = [
        {
            name: "Pending",
            value: reportData.pendingComplaints
        },
        {
            name: "In Progress",
            value: reportData.inProgressComplaints
        },
        {
            name: "Resolved",
            value: reportData.resolvedComplaints
        }
    ];

    const COLORS = [
        "#f59e0b",
        "#3b82f6",
        "#22c55e"
    ];
    const residentStatusData = [

        {
            name: "Approved",
            value: reportData.approvedResidents,
            color: "#22c55e"
        },

        {
            name: "Pending",
            value: reportData.pendingResidents,
            color: "#eab308"
        },

        {
            name: "Rejected",
            value: reportData.rejectedResidents,
            color: "#ef4444"
        }

    ];
    const currentDate = new Date().toLocaleDateString();
    const complaintTrendData = reportData.complaintTrend;
    return (

        <div className="reports-container">

            <div className="reports-header">
                <div className="reports-title">

                    <h1>Society Apartment Management Report</h1>

                    <p>
                        Generated on: {currentDate}
                    </p>

                </div>
                <div className="reports-actions">

                    <button
                        className="dashboard-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </button>

                    <button
                        className="download-btn"
                        onClick={downloadReport}
                    >
                        Download PDF Report
                    </button>

                </div>
            </div>
            <div className="reports-charts-grid">

                <div className="reports-chart-card full-width">
                    <h3>Society Overview</h3>
                    <div className="reports-chart-body">
                        <ResponsiveContainer>

                            <BarChart data={chartData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="count"
                                    fill="#2563eb"
                                />

                            </BarChart>

                        </ResponsiveContainer>


                    </div>
                </div>



                <div className="reports-chart-card">

                    <h3>📌 Complaint Status Distribution</h3>

                    <div className="reports-chart-body">

                        <ResponsiveContainer width="100%" height="100%">

                            <PieChart>

                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={110}
                                    label
                                >

                                    {pieData.map((entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />

                                    ))}

                                </Pie>

                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>
                <div className="reports-chart-card">

                    <h3>Resident Status</h3>

                    <ResponsiveContainer width="100%" height={300}>

                        <PieChart>

                            <Pie
                                data={residentStatusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={110}
                                dataKey="value"
                            >
                                {
                                    residentStatusData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))
                                }

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>
                <div className="reports-chart-card full-width">

                    <h3>Complaint Trend</h3>

                    <ResponsiveContainer width="100%" height={300}>

                        <LineChart data={complaintTrendData}>

                            <CartesianGrid />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="complaints"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>
            </div>
            <div className="reports-summary">

                <h2>📋 Report Summary</h2>

                <div className="reports-summary-grid">

                    <div className="reports-summary-card">
                        <FaUsers className="summary-icon blue" />
                        <h4>Total Residents</h4>
                        <p>{reportData.residents}</p>
                    </div>

                    <div className="reports-summary-card">
                        <FaUserFriends className="summary-icon green" />
                        <h4>Total Visitors</h4>
                        <p>{reportData.visitors}</p>
                    </div>

                    <div className="reports-summary-card">
                        <FaExclamationTriangle className="summary-icon red" />
                        <h4>Total Complaints</h4>
                        <p>{reportData.complaints}</p>
                    </div>

                    <div className="reports-summary-card">
                        <FaBullhorn className="summary-icon orange" />
                        <h4>Total Notices</h4>
                        <p>{reportData.notices}</p>
                    </div>

                    <div className="reports-summary-card">
                        <FaCalendarAlt className="summary-icon purple" />
                        <h4>Total Events</h4>
                        <p>{reportData.events}</p>
                    </div>

                    <div className="reports-summary-card">
                        <FaClock className="summary-icon yellow" />
                        <h4>Pending</h4>
                        <p>{reportData.pendingComplaints}</p>
                    </div>

                    <div className="reports-summary-card">
                        <FaSpinner className="summary-icon cyan" />
                        <h4>In Progress</h4>
                        <p>{reportData.inProgressComplaints}</p>
                    </div>

                    <div className="reports-summary-card">
                        <FaCheckCircle className="summary-icon success" />
                        <h4>Resolved</h4>
                        <p>{reportData.resolvedComplaints}</p>
                    </div>

                </div>

            </div>        </div>


    );

};

export default Reports;
