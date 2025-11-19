import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { fithubDB } from "../firebase";
import { useUser } from "../context/UserContext";
import "./LoginPage.css";
console.log("LoginPage mounted");

interface FirebaseUser {
  Name: string;
  email: string;
  membership: string;
  password: string;
  phone: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usersRef = ref(fithubDB, "users");

    try {
      const snapshot = await get(usersRef);

      if (!snapshot.exists()) {
        setError("No users found.");
        return;
      }

      const users = snapshot.val();

      const matched = Object.entries(users).find(
        ([uid, u]) =>
          (u as FirebaseUser).email === email &&
          (u as FirebaseUser).password === password
      );

      if (!matched) {
        setError("Invalid email or password.");
        return;
      }

      const [username, details] = matched as [string, FirebaseUser];

      setUser({
        username,
        name: details.Name,
        email: details.email,
        membership: details.membership,
        phone: details.phone,
      });

      navigate("/member-dashboard");
    } catch (err) {
      console.error(err);
      setError("Unable to connect to database.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/Fithublogo2.png"></img>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
