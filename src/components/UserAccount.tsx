function UserAccount(){
    const usernames = [     /* we will eventually have to change this so it pulls usernames from a database*/
            'johndoe',
            'johnnyboy',
            'msabesan',
            'theman'
        ];
    return( 
        <>
        <div className="card">
            <img
                src="/photos/defaultprofilepic.png"
                alt="Profile"
                className="rounded-circle mb-2"
                width="40"
                height="40"
            />
            
        </div>
        <div className="userinfo">
            <h5 className="username">Welcome {usernames[0]}</h5>
            <p className="details">View Account Details</p> {/* this will eventually have to be a button that goes to the profile details page */}
        </div>
        </>
    );
}

export default UserAccount;