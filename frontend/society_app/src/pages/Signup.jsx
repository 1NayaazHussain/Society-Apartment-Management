import "../styles/Signup.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaBuilding,
    FaLock
} from "react-icons/fa";

function Signup() {
    const [flats, setFlats] = useState([]);
    const [showFlats, setShowFlats] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        flatNo: "",
        password: "",
        confirmPassword: ""
    });
    const [selectedFlat, setSelectedFlat] = useState("");
    const groupedFlats = {
        A: flats.filter(flat => flat.flatNo.startsWith("A")),
        B: flats.filter(flat => flat.flatNo.startsWith("B")),
        C: flats.filter(flat => flat.flatNo.startsWith("C")),
        D: flats.filter(flat => flat.flatNo.startsWith("D")),
        E: flats.filter(flat => flat.flatNo.startsWith("E"))
    };

    useEffect(() => {
        fetchFlats();
    }, []);

    const fetchFlats = async () => {
        try {

            const res = await axios.get(
                "http://localhost:5000/api/flats"
            );

            setFlats(res.data);

        } catch (error) {

            console.log(error);

        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSignup = async () => {

        if (!selectedFlat) {
            alert("Please select an apartment");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const res = await axios.post(
                "http://localhost:5000/api/users/signup",
                {
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    flatNo: selectedFlat,
                    password: formData.password
                }
            );

            alert(res.data.message);

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Signup Failed"
            );

        }
    };
    return (
        <div className="signup-container">
            <div className="signup-card">
                {/* Professional SVG Icon - no emoji */}
                <div className="signup-icon-wrapper">
                    <svg
                        className="signup-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                            fill="white"
                        />
                    </svg>
                </div>

                <div className="signup-header">
                    <h2>Sign Up</h2>
                    <p>Create your account and get started</p>
                </div>

                <div className="form-grid">
                    <div className="input-group full-width">
                        <FaUser className="input-icon" />
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group full-width">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FaPhone className="input-icon" />
                        <input type="number" name = "phone" placeholder="(+91) Phone Number" value={formData.phone}
                            onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <FaBuilding className="input-icon" />

                        <input
                            type="text"
                            placeholder="Select Apartment"
                            value={selectedFlat}
                            readOnly
                            onClick={() => setShowFlats(!showFlats)}
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input type="password" name= "password" placeholder="Password" value={formData.password}
                            onChange={handleChange} required />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input type="password" name= "confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword}
                            onChange={handleChange} required />
                    </div>
                </div>


                {showFlats && (

                    <div className="flat-selector">

                        <h4>A Wing (1st Floor)</h4>
                        <div className="flat-grid">
                            {groupedFlats.A.map((flat) => (
                                <button
                                    key={flat._id}
                                    type="button"
                                    disabled={flat.occupied}
                                    className={flat.occupied ? "occupied" : "available"}
                                    onClick={() => {
                                        setSelectedFlat(flat.flatNo);

                                        setFormData({
                                            ...formData,
                                            flatNo: flat.flatNo
                                        });

                                        setShowFlats(false);
                                    }}
                                >
                                    {flat.flatNo}
                                </button>
                            ))}
                        </div>

                        <h4>B Wing (2nd Floor)</h4>
                        <div className="flat-grid">
                            {groupedFlats.B.map((flat) => (
                                <button
                                    key={flat._id}
                                    type="button"
                                    disabled={flat.occupied}
                                    className={flat.occupied ? "occupied" : "available"}
                                    onClick={() => {
                                        setSelectedFlat(flat.flatNo);

                                        setFormData({
                                            ...formData,
                                            flatNo: flat.flatNo
                                        });

                                        setShowFlats(false);
                                    }}
                                >
                                    {flat.flatNo}
                                </button>
                            ))}
                        </div>

                        <h4>C Wing (3rd Floor)</h4>
                        <div className="flat-grid">
                            {groupedFlats.C.map((flat) => (
                                <button
                                    key={flat._id}
                                    type="button"
                                    disabled={flat.occupied}
                                    className={flat.occupied ? "occupied" : "available"}
                                    onClick={() => {
                                        setSelectedFlat(flat.flatNo);

                                        setFormData({
                                            ...formData,
                                            flatNo: flat.flatNo
                                        });

                                        setShowFlats(false);
                                    }}

                                >
                                    {flat.flatNo}
                                </button>
                            ))}
                        </div>
                        <h4>D Wing (4th Floor)</h4>
                        <div className="flat-grid">
                            {groupedFlats.D.map((flat) => (
                                <button
                                    key={flat._id}
                                    type="button"
                                    disabled={flat.occupied}
                                    className={flat.occupied ? "occupied" : "available"}
                                    onClick={() => {
                                        setSelectedFlat(flat.flatNo);

                                        setFormData({
                                            ...formData,
                                            flatNo: flat.flatNo
                                        });

                                        setShowFlats(false);
                                    }}
                                >
                                    {flat.flatNo}
                                </button>
                            ))}
                        </div>
                        <h4>E Wing (5th Floor)</h4>
                        <div className="flat-grid">
                            {groupedFlats.E.map((flat) => (
                                <button
                                    key={flat._id}
                                    type="button"
                                    disabled={flat.occupied}
                                    className={flat.occupied ? "occupied" : "available"}
                                    onClick={() => {
                                        setSelectedFlat(flat.flatNo);

                                        setFormData({
                                            ...formData,
                                            flatNo: flat.flatNo
                                        });

                                        setShowFlats(false);
                                    }}
                                >
                                    {flat.flatNo}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="terms-row">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        I agree to the <a href="/terms">Terms & Conditions</a>
                    </label>
                </div>

                <button
                    className="signup-btn"
                    onClick={handleSignup}
                >
                    Create Account
                </button>

                <p className="login-link">
                    Already have an account? <a href="/">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;