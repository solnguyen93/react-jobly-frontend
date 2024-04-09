import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';
import JoblyApi from '../api';
import useLocalStorage from '../hooks/useLocalStorage';
import jwt from 'jsonwebtoken';

// Create a provider component for user authentication
const UserProvider = ({ children }) => {
    // Custom hook to manage token in localStorage
    const [token, setToken] = useLocalStorage('token', '');

    // Initialize user state to null
    const [user, setUser] = useState(null);

    // Initialize applied jobs state
    const [appliedJobs, setAppliedJobs] = useState([]);

    // Initialize message state with both message and type properties
    const [msg, setMsg] = useState({ text: null, type: null });

    // Function to set message with both text and type
    const setMessage = (text, type) => {
        setMsg({ text, type });
    };

    useEffect(() => {
        // Function to load user information using the token
        const loadUserInfo = async () => {
            if (token) {
                JoblyApi.token = token;
                try {
                    let { username, isAdmin, firstName } = jwt.decode(token);
                    if (isAdmin) {
                        setUser({ username, isAdmin, firstName: firstName || 'ADMIN' });
                    } else {
                        const currentUserData = await getCurrentUser(username);
                        setUser(currentUserData);
                        // Fetch job details when user info is loaded
                        const userAppliedJobIDs = await getAppliedJobIDs(username);
                        await fetchJobDetails(userAppliedJobIDs);
                    }
                } catch (err) {
                    setMessage('Error loading user', 'error');
                }
            }
        };

        loadUserInfo();
    }, [token]);

    // Function to log in the user
    const login = async (userData) => {
        try {
            // Call the login API endpoint and set the token if successful
            const tokenFromServer = await JoblyApi.login(userData);
            setToken(tokenFromServer);
        } catch (error) {
            setMessage('Error logging in', 'error');
            throw error;
        }
    };

    // Function to log out the user
    const logout = () => {
        // Clear the token to log out the user
        setToken(null);
        setUser(null);
        // Reset the appliedJobs state to null
        setAppliedJobs(null);
    };

    // Function to sign up the user
    const signup = async (userData) => {
        try {
            // Call the signup API endpoint and set the token if successful
            const tokenFromServer = await JoblyApi.signup(userData);
            setMessage('Successfully signed up', 'success');
            setToken(tokenFromServer);
        } catch (error) {
            setMessage('Error signing up', 'error');
            throw error;
        }
    };

    // Function to fetch current user data
    const getCurrentUser = async (username) => {
        try {
            // Call the getCurrentUser API endpoint and set the user data
            const currentUserData = await JoblyApi.getCurrentUser(username);
            return currentUserData;
        } catch (error) {
            setMessage('Error fetching current user', 'error');
            throw error;
        }
    };

    // Function to update user data
    const updateUser = async (username, data) => {
        try {
            // Call the updateUser API endpoint and update the user data in the context
            const updatedUser = await JoblyApi.updateUser(username, data);
            setMessage('User information updated successfully', 'success');
            setUser(updatedUser);
        } catch (error) {
            setMessage('Error updating user', 'error');
            throw error;
        }
    };

    // Function to delete a user with the specified username
    const deleteUser = async (username) => {
        try {
            // Call the deleteUser API endpoint and delete the user data
            const updatedUser = await JoblyApi.deleteUser(username);
            setMessage('User deleted successfully', 'success');
            setUser(updatedUser);
        } catch (error) {
            setMessage('Error deleting user', 'error');
            throw error;
        }
    };

    // Function to fetch job details for a list of job IDs
    const fetchJobDetails = async (jobIDs) => {
        try {
            const jobs = await Promise.all(jobIDs.map((jobId) => JoblyApi.getJob(jobId)));
            setAppliedJobs(jobs);
        } catch (error) {
            setMessage('Error fetching applied job details:', 'error');
            throw error;
        }
    };

    // Function to fetch the list of applied jobs for the user
    const getAppliedJobIDs = async (username) => {
        try {
            const appliedJobIDs = await JoblyApi.getAppliedJobIDs(username);
            return appliedJobIDs;
        } catch (error) {
            console.error('Error fetching applied jobs:', error);
            return [];
        }
    };

    // Function to apply a specific user to a specific job
    const applyToJob = async (username, jobId) => {
        try {
            // Call the applyToJob API endpoint and apply the user to job
            await JoblyApi.applyToJob(username, jobId);
            // Update the appliedJobs state with the job details
            const jobDetails = await JoblyApi.getJob(jobId);
            setAppliedJobs([...appliedJobs, jobDetails]);
            setMessage(`Applied to job ${jobId} successfully`, 'success');

            console.log(appliedJobs);
        } catch (error) {
            setMessage('Error applying to job', 'error');
            throw error;
        }
    };

    // Function to delete a job with the specified ID
    const deleteJob = async (id) => {
        try {
            // Call the deleteJob API endpoint and delete the job
            await JoblyApi.deleteJob(id);
            setMessage(`Deleted job ${id} successfully`, 'success');
        } catch (error) {
            setMessage('Error deleting job', 'error');
            throw error;
        }
    };

    // Function to update a job with the specified ID
    const updateJob = async (id, data) => {
        try {
            // Call the updateJob API endpoint and update the job
            await JoblyApi.updateJob(id, data);
            setMessage(`Updated job ${id} successfully`, 'success');
        } catch (error) {
            setMessage('Error updating job', 'error');
            throw error;
        }
    };

    // Function to create a job
    const createJob = async (data) => {
        try {
            // Call the createJob API endpoint and update the job
            await JoblyApi.createJob(data);
            setMessage(`Created job successfully`, 'success');
        } catch (error) {
            setMessage('Error creating job', 'error');
            throw error;
        }
    };

    // Clear the error message after a certain period of time
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null, null);
        }, 3000); // Clear the error message after 3 seconds

        return () => clearTimeout(timer);
    }, [msg]);

    // Provide the token, user data, login, logout, and signup functions to child components
    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                deleteUser,
                appliedJobs,
                setAppliedJobs,
                getAppliedJobIDs,
                applyToJob,
                deleteJob,
                updateJob,
                createJob,
                login,
                logout,
                signup,
                msg,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
