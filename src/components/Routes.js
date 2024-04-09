import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Homepage from './Homepage';
import JobList from './JobList';
import NewJobForm from './NewJobForm';
import EditJobForm from './EditJobForm';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import NavBar from './NavBar';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Profile from './Profile';
import EditProfileForm from './EditProfileForm';
import { ProtectedRoute, AdminProtectedRoute, AuthenticatedRoute } from './ProtectedRoute';

function AppRoutes() {
    const { msg } = useContext(UserContext);

    return (
        <Router>
            <NavBar />
            {msg && msg.type && (
                <div className={`msg alert-${msg.type}`} role="alert">
                    {msg.text}
                </div>
            )}
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/jobs" element={<JobList />} />
                    <Route path="/jobs/new" element={<NewJobForm />} />
                    <Route path="/companies" element={<CompanyList />} />
                    <Route path="/companies/:handle" element={<CompanyDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:username" element={<EditProfileForm />} />
                </Route>
                <Route path="/" element={<AdminProtectedRoute />}>
                    <Route path="/jobs/:id/edit" element={<EditJobForm />} />
                </Route>
                <Route path="/" element={<AuthenticatedRoute />}>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignUpForm />} />
                </Route>
                <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
