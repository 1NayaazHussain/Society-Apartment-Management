import Sidebar from "../components/Sidebar";
import "../styles/Settings.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Settings() {
    const [settings, setSettings] = useState({
        secretaryName: "",
        secretaryEmail: "",
        secretaryPhone: "",
        societyName: "",
        societyAddress: ""
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState("");


    const handleChange = (e) => {

        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });

    };
    const handlePasswordChange = (e) => {

        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });

    };
    const fetchSettings = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/settings"
            );

            setSettings(res.data);
            if (res.data.profileImage) {
    setPreview(
        `http://localhost:5000/uploads/${res.data.profileImage}`
    );
}

        } catch (error) {

            console.log(error);

        }

    };
    const saveSettings = async () => {

        try {

            const res = await axios.put(
                "http://localhost:5000/api/settings",
                settings
            );

            alert(res.data.message);

        } catch (error) {

            console.log(error);

            alert("Failed to save settings");

        }

    };
    const updatePassword = async () => {

        try {

            const res = await axios.put(
                "http://localhost:5000/api/settings/change-password",
                passwordData
            );

            alert(res.data.message);

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update password"
            );

        }

    };
    const uploadProfileImage = async () => {

        if (!profileImage) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("profileImage", profileImage);

        try {

            const res = await axios.put(
                "http://localhost:5000/api/settings/upload-profile",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Profile image uploaded successfully!");

            console.log(res.data);

        } catch (error) {

            console.log(error);

            alert("Failed to upload image.");

        }

    };
    useEffect(() => {

        fetchSettings();

    }, []);

    return (

        <div className="settings-container">

            <Sidebar />

            <div className="settings-content">

                <h2>Settings</h2>

                <p className="settings-subtitle">
                    Manage your profile and society information
                </p>

                {/* Profile */}

                <div className="settings-card">

                    <h3>Profile</h3>

                    <div className="profile-image">

                    <div className="avatar">

    {preview ? (
        <img
            src={preview}
            alt="Profile"
            className="profile-preview"
        />
    ) : (
        "S"
    )}

</div>

                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            style={{ display: "none" }}

                            onChange={(e) => {
                                const file = e.target.files[0];

                                if (file) {
                                    setProfileImage(file);
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                        />


                        <button
                            onClick={() =>
                                document.getElementById("profileImage").click()
                            }
                        >
                            Choose Photo
                        </button>

                        <button
                            onClick={uploadProfileImage}
                        >
                            Upload Photo
                        </button>

                    </div>
                    <input
                        type="text"
                        name="secretaryName"
                        value={settings.secretaryName}
                        onChange={handleChange}
                        placeholder="Secretary Name"
                    />
                    <input
                        type="email"
                        name="secretaryEmail"
                        value={settings.secretaryEmail}
                        onChange={handleChange}
                        placeholder="Secretary Email"
                    />

                    <input
                        type="number"
                        name="secretaryPhone"
                        value={settings.secretaryPhone}
                        onChange={handleChange}
                        placeholder="Secretary Phone"
                    />

                </div>

                {/* Society */}

                <div className="settings-card">

                    <h3>Society Information</h3>

                    <input
                        type="text"
                        name="societyName"
                        value={settings.societyName}
                        onChange={handleChange}
                        placeholder="Society Name"
                    />

                    <textarea
                        name="societyAddress"
                        value={settings.societyAddress}
                        onChange={handleChange}
                        placeholder="Society Address"
                    />

                </div>

                {/* Password */}

                <div className="settings-card">

                    <h3>Change Password</h3>

                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button
                    className="update-password-btn"
                    onClick={updatePassword}
                >
                    Update Password
                </button>

                <button
                    className="save-btn"
                    onClick={saveSettings}
                >
                    Save Changes
                </button>

            </div>

        </div>

    );

}

export default Settings;