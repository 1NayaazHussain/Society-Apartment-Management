import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      if (res.data.success) {
        console.log(res.data.user);

        localStorage.setItem(
          "role",
          res.data.user.role
        );
        localStorage.setItem(
          "fullName",
          res.data.user.fullName
        );
        localStorage.setItem(
          "flatNo",
          res.data.user.flatNo
        );
        localStorage.setItem(
          "userId",
          res.data.user._id
        );
        localStorage.setItem(
          "email",
          res.data.user.email
        );

        alert("Login successful");
     

        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">

    <div className="login-logo">
        🏢
    </div>

    <h2>Society Management</h2>

    <p>
        Welcome back! Login to continue.
    </p>

</div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
          <p className="login-link">
    Don't have an account?{" "}
    <Link to="/signup">Sign Up</Link>
</p>
        </form>
      </div>
    </div>

  );
}