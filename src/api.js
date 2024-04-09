import axios from 'axios'; // Importing axios library

// Base URL for API requests
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/**
 * API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 */
class JoblyApi {
    // the token for interactive with the API will be stored here.
    static token;

    /**
     * Makes a request to the API.
     * @param {string} endpoint - The API endpoint to request.
     * @param {object} data - The data to send with the request.
     * @param {string} method - The HTTP method for the request (default is 'get').
     */
    static async request(endpoint, data = {}, method = 'get') {
        console.debug('API Call:', endpoint, data, method);

        // Set URL and headers for the request
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = method === 'get' ? data : {};

        try {
            // Make the request using axios
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            // Handle API errors
            console.error('API Error:', err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /**
     * Get details on a company by handle.
     * @param {string} name - The name of the company to search for (optional).
     */
    static async getCompanies(name) {
        try {
            const params = name ? { name } : {};
            let res = await this.request(`companies`, params);
            return res.companies;
        } catch (error) {
            console.error('Error fetching companies:', error);
            throw error;
        }
    }

    /**
     * Get details of a company by its handle.
     * @param {string} handle - The handle of the company.
     */
    static async getCompany(handle) {
        try {
            let res = await this.request(`companies/${handle}`);
            return res.company;
        } catch (error) {
            console.error('Error fetching company:', error);
            throw error;
        }
    }

    /**
     * Get all jobs.
     */
    static async getAllJobs() {
        try {
            let res = await this.request('jobs');
            return res.jobs;
        } catch (error) {
            console.error('Error fetching all jobs:', error);
            throw error;
        }
    }

    /**
     * Get details of a job by its ID.
     * @param {string} id - The ID of the job.
     */
    static async getJob(id) {
        try {
            let res = await this.request(`jobs/${id}`);
            return res.job;
        } catch (error) {
            console.error('Error fetching job:', error);
            throw error;
        }
    }

    /**
     * Create a new job.
     * @param {object} data - The data for the new job.
     */
    static async createJob(data) {
        try {
            let res = await this.request('jobs', data, 'post');
            return res.job;
        } catch (error) {
            console.error('Error creating job:', error);
            throw error;
        }
    }

    /**
     * Update an existing job.
     * @param {string} id - The ID of the job to update.
     * @param {object} data - The updated data for the job.
     */
    static async updateJob(id, data) {
        try {
            let res = await this.request(`jobs/${id}`, data, 'patch');
            return res.job;
        } catch (error) {
            console.error('Error updating job:', {}, error);
            throw error;
        }
    }

    /**
     * Delete a job by its ID.
     * @param {string} id - The ID of the job to delete.
     */
    static async deleteJob(id) {
        try {
            await this.request(`jobs/${id}`, {}, 'delete');
            return id;
        } catch (error) {
            console.error('Error deleting job:', error);
            throw error;
        }
    }

    // Authentication routes...

    /**
     * Log in a user.
     * @param {object} data - The login credentials.
     */
    static async login(data) {
        try {
            const res = await this.request('auth/token', data, 'post');
            return res.token;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    /**
     * Register a new user.
     * @param {object} data - The user registration data.
     */
    static async signup(data) {
        try {
            const res = await this.request('auth/register', data, 'post');
            return res.token;
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
    }

    // User routes...

    /**
     * Get details of the current user.
     * @param {string} username - The username of the current user.
     */
    static async getCurrentUser(username) {
        try {
            const res = await this.request(`users/${username}`);
            return res.user;
        } catch (error) {
            console.error('Error fetching current user:', error);
            throw error;
        }
    }

    /**
     * Update details of a user.
     * @param {string} username - The username of the user to update.
     * @param {object} data - The updated data for the user.
     */
    static async updateUser(username, data) {
        try {
            let res = await this.request(`users/${username}`, data, 'patch');
            return res.user;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    /**
     * Delete a user by username.
     * @param {string} username - The username of the user to delete.
     */
    static async deleteUser(username) {
        try {
            await this.request(`users/${username}`, {}, 'delete');
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    /**
     * Apply to a job.
     * @param {string} username - The username of the user applying to the job.
     * @param {string} jobId - The ID of the job to apply for.
     */
    static async applyToJob(username, jobId) {
        try {
            await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
        } catch (error) {
            console.error('Error applying to job:', error);
            throw error;
        }
    }

    /**
     * Get IDs of jobs a user has applied to.
     * @param {string} username - The username of the user.
     */
    static async getAppliedJobIDs(username) {
        try {
            const res = await this.request(`users/${username}`);
            return res.user.applications;
        } catch (error) {
            console.error('Error fetching applied jobs:', error);
            throw error;
        }
    }
}

export default JoblyApi;
