import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Notice.css";

const Notices = () => {

    const navigate = useNavigate();

    const [notices, setNotices] = useState([]);

    const fetchNotices = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/notices"
            );

            setNotices(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchNotices();

    }, []);

    const deleteNotice = async (id) => {

        if (!window.confirm("Delete this notice?")) return;

        try {

            await axios.delete(
                `http://localhost:5000/api/notices/${id}`
            );

            fetchNotices();

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="page">

            <div className="notice-header">

                <div className="notice-header-left">

                    <div className="header-content-card">

                        <span className="section-tag">
                            NOTICE MANAGEMENT
                        </span>

                        <h1>Notices</h1>

                        <p>
                            Create, publish and manage important announcements,
                            maintenance updates, meetings and emergency alerts
                            for all residents.
                        </p>
                        <div className="header-buttons">
                        <button
                            className="dashboard-btn"
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </button>

                        <button
                            className="add-btn"
                            onClick={() => navigate("/add-notice")}
                        >
                            + Add Notice
                        </button>
                        </div>

                    </div>

                </div>

            </div>

            <div className="notice-grid">

                {notices.length === 0 ? (

                    <div className="empty-state">

                        <h2>📭 No Notices Found</h2>

                        <p>Create your first notice for residents.</p>

                    </div>

                ) : (



                    notices.map((notice) => (

                        <div
                            className="notice-card"
                            key={notice._id}
                        >

                            <h2>{notice.title}</h2>

                            <p className="notice-description">

                                {notice.description}

                            </p>
                            <div className="notice-tags">

                                <span className={`category ${notice.category.toLowerCase()}`}>

                                    {notice.category}

                                </span>

                                <span className={`priority ${notice.priority.toLowerCase()}`}>

                                    {notice.priority}

                                </span>

                            </div>
                            <p className="notice-author">

                                <strong>Posted By:</strong> {notice.postedBy}

                            </p>

                            <p className="notice-date">

                                {new Date(notice.createdAt).toLocaleDateString()}

                            </p>

                            <div className="notice-buttons">

                                <button
                                    onClick={() => navigate(`/edit-notice/${notice._id}`)}
                                >
                                    ✏ Edit
                                </button>

                                <button
                                    onClick={() => deleteNotice(notice._id)}
                                >
                                    🗑 Delete
                                </button>

                            </div>

                        </div>

                    ))
                )
                }

            </div>

        </div>


    );

};

export default Notices;