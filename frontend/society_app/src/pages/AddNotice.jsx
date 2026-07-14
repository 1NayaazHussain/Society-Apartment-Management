import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNotice = () => {

    const navigate = useNavigate();

    const [noticeData, setNoticeData] = useState({

        title: "",

        description: "",

        category: "General",

        priority: "Normal",

        postedBy: "Admin"

    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            await axios.post(

                "http://localhost:5000/api/notices",

                noticeData

            );

            alert("Notice Added Successfully!");

            navigate("/notices");

        }

        catch(error){

            console.log(error);

            alert("Failed to add notice.");

        }

    };

    return(

        <div className="page">

            <div className="form-container">

                <h1>Add Notice</h1>

                <p>Create a new notice for residents.</p>

                <form
                    className="event-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Notice Title"
                        value={noticeData.title}
                        onChange={(e)=>
                            setNoticeData({
                                ...noticeData,
                                title:e.target.value
                            })
                        }
                    />

                    <textarea
                        rows="6"
                        placeholder="Notice Description"
                        value={noticeData.description}
                        onChange={(e)=>
                            setNoticeData({
                                ...noticeData,
                                description:e.target.value
                            })
                        }
                    />

                    <select
                        value={noticeData.category}
                        onChange={(e)=>
                            setNoticeData({
                                ...noticeData,
                                category:e.target.value
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
                        onChange={(e)=>
                            setNoticeData({
                                ...noticeData,
                                priority:e.target.value
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
                        onChange={(e)=>
                            setNoticeData({
                                ...noticeData,
                                postedBy:e.target.value
                            })
                        }
                    />

                    <div className="form-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={()=>navigate("/notices")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="create-btn"
                        >
                            Add Notice
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default AddNotice;