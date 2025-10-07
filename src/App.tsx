import GoalsList from "./components/GoalsList";
import UserAccount from "./components/UserAccount";
import FitHubLogo from "./components/FitHubLogo";
import UpcomingClasses from "./components/UpcomingClasses";
import "./App.css";

function App(){
    return (
        <>
        <div className="fithub-logo"><FitHubLogo></FitHubLogo></div>
        <div className="goals-container"><GoalsList></GoalsList></div>
        <div className="useraccount-container"><UserAccount></UserAccount></div>

        <div className="upcoming-container"><UpcomingClasses></UpcomingClasses></div>
        </>
    );
}

export default App;