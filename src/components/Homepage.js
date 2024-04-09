import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

function Homepage() {
    const { user } = useContext(UserContext);

    const { firstName, isAdmin } = user || {};

    return (
        <div className="Homepage">
            {user ? (
                <div>
                    <h1>Welcome Back, {firstName}.</h1>
                    <p>You are logged in as an {isAdmin ? 'admin' : 'regular'} user.</p>
                </div>
            ) : (
                <div>
                    <h1>Welcome to Jobly, please sign up or log in.</h1>
                    <p>Alternatively, you can use the following credentials for easy access:</p>
                    <p>User:</p>
                    <p>
                        Username: <strong>testuser</strong>
                    </p>
                    <p>
                        Password: <strong>password</strong>
                    </p>
                    <p>Admin:</p>
                    <p>
                        Username: <strong>testadmin</strong>
                    </p>
                    <p>
                        Password: <strong>password</strong>
                    </p>
                </div>
            )}
        </div>
    );
}

export default Homepage;
