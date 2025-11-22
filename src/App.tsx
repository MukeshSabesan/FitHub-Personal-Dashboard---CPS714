import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoalsList from "./components/GoalsList";
import UserAccount from "./components/UserAccount";
import FitHubLogo from "./components/FitHubLogo";
import UpcomingClasses from "./components/UpcomingClasses";
import AccountDetails from "./components/AccountDetails";
import MembershipDetails from "./components/MembershipDetails";
import LoginPage from "./components/LoginPage";
import { UserProvider } from "./context/UserContext";
import "./App.css";

function App(){
    return (
        <UserProvider> 
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />

                    <Route
                        path="/member-dashboard"
                        element={
                            <>
                            <div className="fithub-logo"><FitHubLogo /></div>
                            <div className="goals-container"><GoalsList /></div>
                            <div className="membership-details"><MembershipDetails /></div>
                            <div className="useraccount-container"><UserAccount /></div>
                            <div className="upcoming-container"><UpcomingClasses /></div>
                            <div className="usage-btn-wrapper">
                                <button className="usage-btn">View Facility and Equipment Usage</button> 
                            </div>
                            </>
                        }
                    />

                    <Route path="/account-details" element={<AccountDetails />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
