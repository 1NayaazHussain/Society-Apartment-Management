import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditNotice = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [noticeData, setNoticeData] = useState({

        title: "",
        description: "",
        category: "General",
        priority: "Normal",
        postedBy: "Admin"

    });

    useEffect(() => {

        fetchNotice();

    }, []);

    const fetchNotice = async () => {

        try {

            const res = await axios.get(
                `http://localhost:5000/api/notices/${id}`
            );

            setNoticeData(res.data);

        }

        catch (error) {

            console.log(error);
            alert("Failed to fetch notice.");

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:5000/api/notices/${id}`,
                noticeData
            );

            alert("Notice Updated Successfully!");

            navigate("/notices");

        }

        catch (error) {

            console.log(error);
            alert("Failed to update notice.");

        }

    };

    return (

        <div className="page">

            <div className="form-container">

                <h1>Edit Notice</h1>

                <p>Update notice information.</p>

                <form
                    className="event-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Notice Title"
                        value={noticeData.title}
                        onChange={(e) =>
                            setNoticeData({
                                ...noticeData,
                                title: e.target.value
                            })
                        }
                        required
                    />

                    <textarea
                        rows="6"
                        placeholder="Notice Description"
                        value={noticeData.description}
                        onChange={(e) =>
                            setNoticeData({
                                ...noticeData,
                                description: e.target.value
                            })
                        }
                        required
                    />

                    <select
                        value={noticeData.category}
                        onChange={(e) =>
                            setNoticeData({
                                ...noticeData,
                                category: e.target.value
                            })
                        }
                    >
                        <option>General</option>
                        <option>Maintenance</option>
                        <option>Emergency</option>
                        <option>Meeting</option>
                        <option>Festival</option>
                    </select>

                    <select
                        value={noticeData.priority}
                        onChange={(e) =>
                            setNoticeData({
                                ...noticeData,
                                priority: e.target.value
                            })
                        }
                    >
                        <option>Normal</option>
                        <option>Important</option>
                        <option>Urgent</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Posted By"
                        value={noticeData.postedBy}
                        onChange={(e) =>
                            setNoticeData({
                                ...noticeData,
                                postedBy: e.target.value
                            })
                        }
                    />

                    <div className="form-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/notices")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="create-btn"
                        >
                            Update Notice
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default EditNotice;