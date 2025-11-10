import { useNavigate } from "react-router-dom";
function UserAccount(){
    const navigate = useNavigate();
    const usernames = [     /* we will eventually have to change this so it pulls usernames from a database*/
            'johndoe',
            'johnnyboy',
            'msabesan',
            'theman'
        ];
    return( 
        <>
        <div className="profile-card">
        <img
            src="/photos/defaultprofilepic.png"
            alt="Profile"
            className="rounded-circle mb-2"
            width="50"
            height="50"
        />
        </div>

         <div className="userinfo">
                <h5 className="main-page-username">Welcome {usernames[0]}</h5>
                <button
                    className="details"
                    onClick={() => navigate("/account-details")}
                >
                    View Account Details
                </button>
         </div>
        </>
    );
}

export default UserAccount;