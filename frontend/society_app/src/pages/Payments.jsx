import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/Documents.css"; // We'll reuse some dashboard/documents styling

function Payments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [hasPaid, setHasPaid] = useState(false);
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId") || "60d5ec49f1b2c8a1e8000000"; // fallback valid ObjectId
  const FIXED_MAINTENANCE_AMOUNT = 1500; // Define fixed amount for demonstration

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    if (role === "admin") {
      fetchPayments();
    } else {
      checkPaymentStatus();
    }
  }, [role, userId]);

  const checkPaymentStatus = async () => {
    try {
      if (userId && userId !== "60d5ec49f1b2c8a1e8000000") {
        const res = await axios.get(`http://localhost:5000/api/payments/status/${userId}`);
        setHasPaid(res.data.hasPaid);
      }
    } catch (error) {
      console.log("Error checking payment status:", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/payments");
      setPayments(res.data);
    } catch (error) {
      console.log("Error fetching payments:", error);
    }
  };

  const handlePayment = async () => {
    try {
      // 1. Create order
      const { data: order } = await axios.post("http://localhost:5000/api/payments/create-order", {
        amount: FIXED_MAINTENANCE_AMOUNT,
        userId: userId
      });

      // 2. Open Razorpay Checkout
      const options = {
        key: "rzp_test_TBEiUI4TC5ky81", // Provided test key
        amount: order.amount,
        currency: order.currency,
        name: "Society Maintenance",
        description: "Monthly Maintenance Bill",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify payment on success
            const verifyRes = await axios.post("http://localhost:5000/api/payments/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.status === 200) {
              alert("Payment Successful!");
              if (role === "admin") {
                fetchPayments();
              } else {
                setHasPaid(true);
              }
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: localStorage.getItem("name") || "Resident",
          email: localStorage.getItem("email") || "resident@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#007bff",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment Failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Error initiating payment. Check server.");
    }
  };

  return (
    <div className="documents-container dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main-content">
        <div className="top-navbar">
          <div className="top-navbar-title-wrapper">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <div className="top-navbar-title">
              <h3>Society Payments</h3>
            </div>
          </div>
        </div>

        <div className="documents-header dashboard-header">
          <div className="header-content">
            <span className="header-tag">PAYMENTS</span>
            <h2>Maintenance Bills</h2>
            <p>Pay your monthly society maintenance bills securely.</p>
          </div>
        </div>

        <div className="payments-content" style={{ padding: "2rem" }}>
          {role !== "admin" ? (
            <div className="payment-card" style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              maxWidth: "500px"
            }}>
              <h3>Monthly Maintenance</h3>
              <p style={{ margin: "1rem 0", color: "#666" }}>
                Amount Due: <strong style={{ fontSize: "1.5rem", color: "#333" }}>₹{FIXED_MAINTENANCE_AMOUNT}</strong>
              </p>
              
              {hasPaid ? (
                <div style={{
                  background: "#d4edda",
                  color: "#155724",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  border: "1px solid #c3e6cb",
                  display: "inline-block",
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}>
                  ✅ Paid for this month
                </div>
              ) : (
                <button 
                  onClick={handlePayment} 
                  style={{
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "bold"
                  }}>
                  Pay Now with Razorpay
                </button>
              )}
            </div>
          ) : (
            <div className="admin-payments-list">
              <h3>Recent Payments</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem", background: "#fff", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <thead style={{ background: "#2563eb", color: "#ffffff", textAlign: "left" }}>
                  <tr>
                    <th style={{ padding: "12px 15px", borderBottom: "2px solid #1d4ed8" }}>Order ID</th>
                    <th style={{ padding: "12px 15px", borderBottom: "2px solid #1d4ed8" }}>Amount</th>
                    <th style={{ padding: "12px 15px", borderBottom: "2px solid #1d4ed8" }}>Status</th>
                    <th style={{ padding: "12px 15px", borderBottom: "2px solid #1d4ed8" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ padding: "15px", textAlign: "center" }}>No payments found.</td>
                    </tr>
                  ) : (
                    payments.map((p) => (
                      <tr key={p._id} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "12px 15px" }}>{p.razorpayOrderId}</td>
                        <td style={{ padding: "12px 15px" }}>₹{p.amount}</td>
                        <td style={{ padding: "12px 15px" }}>
                          <span style={{ 
                            padding: "4px 8px", 
                            borderRadius: "12px", 
                            fontSize: "0.85rem",
                            background: p.status === "successful" ? "#d4edda" : p.status === "failed" ? "#f8d7da" : "#fff3cd",
                            color: p.status === "successful" ? "#155724" : p.status === "failed" ? "#721c24" : "#856404"
                          }}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: "12px 15px" }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payments;
