import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function UserAccount(){
    const navigate = useNavigate();
    const { user } = useUser();

    return(
        <>
        <div className="profile-card">
            <img
                src="/photos/defaultprofilepic.png"
                alt="Profile"
                width="50"
                height="50"
            />
        </div>

        <div className="userinfo">
            <h5 className="main-page-username">
              Welcome {user?.username}
            </h5>

            <button
                className="details"
                onClick={() => navigate("/account-details")}
            >
                View Account Details
            </button>

            <button className="details"
                onClick={() => navigate("/")}>
                Log out
            </button>
        </div>
        </>
    );
}

export default UserAccount;
