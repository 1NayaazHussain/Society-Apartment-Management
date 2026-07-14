import "../styles/RecentComplaints.css";
import { FaExclamationTriangle } from "react-icons/fa";
function RecentComplaints({ complaints }) {
    return (
        <div className="recent-complaints">

            <div className="complaints-header">

                <div>
                    <span className="section-tag">
                        MANAGEMENT
                    </span>

                    <h2>Recent Complaints</h2>

                    <p>
                        Latest complaints submitted by society residents.
                    </p>
                </div>

                <div className="complaints-icon">
                    <FaExclamationTriangle />
                </div>

            </div>

            {complaints.length === 0 ? (

                <div className="empty-state">

                    <div className="empty-circle">
                        <FaExclamationTriangle />
                    </div>

                    <h3>No Complaints Yet</h3>

                    <p>
                        Great! Your society currently has no pending complaints.
                    </p>

                </div>

            ) : (

                <div className="complaints-list">

                    {complaints.slice(0, 5).map((complaint) => (

                        <div
                            className="complaint-item"
                            key={complaint._id}
                        >

                            <div>

                                <h4>{complaint.title}</h4>

                                <p>{complaint.description}</p>

                            </div>

                            <span className={`status-badge ${complaint.status.toLowerCase()}`}>
                                {complaint.status}
                            </span>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default RecentComplaints;