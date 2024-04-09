import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import '../styles/NavBar.css';

function NavBar() {
    const { logout, user } = useContext(UserContext);

    const { firstName } = user || {};

    return (
        <nav className="navbar">
            <div className="nav-links-left">
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>
            </div>
            {user ? (
                <div className="nav-links-right">
                    <NavLink to="/jobs" className="nav-link">
                        Jobs
                    </NavLink>
                    <NavLink to="/companies" className="nav-link">
                        Companies
                    </NavLink>
                    <NavLink to="/profile" className="nav-link">
                        {firstName}
                    </NavLink>
                    <NavLink className="nav-link logout" onClick={logout} to="/">
                        Log Out
                    </NavLink>
                </div>
            ) : (
                <div className="nav-links-right">
                    <NavLink to="/login" className="nav-link">
                        Login
                    </NavLink>
                    <NavLink to="/signup" className="nav-link">
                        Sign Up
                    </NavLink>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
