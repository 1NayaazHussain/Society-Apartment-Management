import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/AddComplaint.css";

import {
    FaUser,
    FaHome,
    FaLayerGroup,
    FaHeading,
    FaFileAlt,
    FaFlag,
    FaArrowLeft
} from "react-icons/fa";

function AddComplaint() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        residentName: "",

        flatNo: "",

        category: "",

        title: "",

        description: "",

        priority: "Medium",

        status: "Pending"

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async () => {

        try {

            await axios.post(

                "http://localhost:5000/api/complaints",

                formData

            );

            alert("Complaint Added Successfully");

            navigate("/complaints");

        }

        catch (err) {

            console.log(err);

            alert("Failed to Add Complaint");

        }

    };

    return (

        <div className="add-complaint-page">

            <div className="background-circle circle1"></div>
            <div className="background-circle circle2"></div>

            <div className="add-complaint-card">

                <div className="title-section">

                    <div className="title-icon">

                        <FaFileAlt />

                    </div>

                    <div>

                        <span className="section-tag">

                            COMPLAINT MANAGEMENT

                        </span>

                        <h2>Add Complaint</h2>

                        <p>

                            Register a new complaint raised by a resident.

                        </p>

                    </div>

                </div>

                <div className="form-grid">

                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            name="residentName"
                            placeholder="Resident Name"
                            value={formData.residentName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <FaHome className="input-icon" />
                        <input
                            type="text"
                            name="flatNo"
                            placeholder="Flat Number"
                            value={formData.flatNo}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <FaLayerGroup className="input-icon" />
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            <option>Water</option>
                            <option>Electricity</option>
                            <option>Security</option>
                            <option>Cleaning</option>
                            <option>Parking</option>
                            <option>Lift</option>
                            <option>Noise</option>
                            <option>Others</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <FaHeading className="input-icon" />
                        <input
                            type="text"
                            name="title"
                            placeholder="Complaint Title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                </div>
                <div className="textarea-group">

                    <textarea
                        name="description"
                        placeholder="Describe the complaint..."
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>

                </div>
                <div className="button-group">

                    <button

                        className="back-btn"

                        onClick={() => navigate("/complaints")}

                    >

                        <FaArrowLeft />

                        Back

                    </button>

                    <button

                        className="save-btn"

                        onClick={handleSubmit}

                    >

                        <FaFlag />

                        Save Complaint

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddComplaint;