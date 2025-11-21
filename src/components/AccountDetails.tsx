import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FitHubLogo from "./FitHubLogo";
import { useUser } from "../context/UserContext";
import "./AccountDetails.css";
import { ref, update, get , set, remove} from "firebase/database";
import { fithubDB } from "../firebase";



function AccountDetails() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    membership: "",
  });

  // LOAD FROM CONTEXT
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        membership: user.membership,
      });
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
  if (!user || !user.username) {
    console.error("No username found for the logged-in user.");
    return;
  }

  const oldUsername = user.username;
  const newUsername = userData.username;

  try {
    // If username did NOT change, just update fields
    if (oldUsername === newUsername) {
      const userRef = ref(fithubDB, `users/${oldUsername}`);

      await update(userRef, {
        Name: userData.name,
        username: newUsername,
        email: userData.email,
        phone: userData.phone,
        membership: userData.membership
      });

      alert("Profile updated!");
      return;
    }

    // Username CHANGED → migrate key
    const oldRef = ref(fithubDB, `users/${oldUsername}`);
    const newRef = ref(fithubDB, `users/${newUsername}`);

    // 1. Read old data
    const snap = await get(oldRef);
    if (!snap.exists()) {
      alert("Old user record not found.");
      return;
    }

    const oldData = snap.val();

    // 2. Create new key with updated data
    await set(newRef, {
      ...oldData,
      Name: userData.name,
      username: newUsername,
      email: userData.email,
      phone: userData.phone,
      membership: userData.membership
    });

    // 3. Delete old key
    await remove(oldRef);

    alert("Username updated and moved successfully!");
    
  } catch (error) {
    console.error("Error saving:", error);
    alert("Failed to update profile.");
  }
};



  return (
    <div className="profile-editor">
      <div className="page-header">
        <div className="fithub-logo"><FitHubLogo /></div>

        <div className="usercard">
          <div className="card2">
            <img className="rounded-circle mb-2"
              src="/photos/defaultprofilepic.png"
              alt="Profile"
              width={40}
              height={40}
              style={{ backgroundColor: "#3a7bd5" }}
            />
          </div>

          <div className="user-info">
            <div className="username">Welcome {userData.username}</div>
            <button className="details2" onClick={() => navigate("/member-dashboard")}>
              ← Back to Personal Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="account-details-container">
        <div className="profile-section">
          <img className="profile-pic"
            src="/photos/defaultprofilepic.png"
            alt="Profile" />
          <button className="change-pic">Change profile picture</button>
        </div>

        <div className="info-section">
          <div className="info-container">
            {Object.entries(userData).map(([field, value]) => (
              <div key={field} className="info-row">
                <label className="info-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>

                {field === "membership" ? (
                  <select
                    value={value}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="info-input"
                  >
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="info-input"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="save-and-upgrade-container">
            <button className="save-btn" onClick={handleSave}>Save Profile Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
