import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountDetails.css";

function AccountDetails() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "John Smith",
    username: "johnnyboy",
    email: "john.smith@gmail.com",
    phone: "937-275-9292",
    membership: "Gold",
    password: "********"
  });

  const handleChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="account-details-container">
     <header className="account-header">
        <div className="useraccount-container">
            <div className="user-card">
            <div className="card">
                <img
                src="/photos/defaultprofilepic.png"
                alt="Profile"
                className="rounded-circle mb-2"
                width="40"
                height="40"
                />
            </div>
            <div className="user-info">
                <h5 className="username">Welcome {userData.username}</h5>
                <button className="details" onClick={() => navigate("/")}>
                ← Back to Personal Dashboard
                </button>
            </div>
            </div>
        </div>
    </header>

      <div className="profile-section">
        <img
          src="/photos/defaultprofilepic.png"
          alt="Profile"
          className="profile-pic"
        />
        <p className="change-pic">Change profile picture</p>
      </div>

      <div className="info-section">
        {Object.entries(userData).map(([field, value]) => (
          <div key={field} className="info-row">
            <label className="info-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(field, e.target.value)}
              className="info-input"
            />
          </div>
        ))}
        <button className="upgrade-btn">Upgrade Membership</button>
        <button className="save-btn" /*onClick={handleSave}*/>Save Profile Changes</button>
      </div>
    </div>
  );
}

export default AccountDetails;
