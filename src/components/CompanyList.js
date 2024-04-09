import React, { useState, useEffect } from 'react';
import Company from './Company.js';
import useDataFetching from '../hooks/useDataFetching';
import JoblyApi from '../api.js';

function CompanyList() {
    // State variables
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const { data: companies, setData: setCompanies, loading } = useDataFetching(JoblyApi.getCompanies.bind(JoblyApi)); // Custom hook to fetch data

    // Fetch data when searchQuery changes
    useEffect(() => {
        const fetchData = async () => {
            if (!loading) {
                try {
                    // Fetch companies based on search query
                    const company = await JoblyApi.getCompanies(searchQuery);
                    setCompanies(company); // Update companies data
                } catch (error) {
                    console.error('Error fetching companies:', error); // Log error if fetching fails
                }
            }
        };
        fetchData();
    }, [searchQuery]);

    // Loading state
    if (loading) {
        return <div>Loading...</div>; // Display loading message
    }

    // Render company list
    return (
        <div className="company">
            <div className="company-search-box-form">
                <h3>Company List</h3>
                <input type="text" placeholder="Search companies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />{' '}
            </div>
            <div className="company-list">
                {companies.map(({ handle, name, description, logoUrl }) => (
                    <Company key={handle} handle={handle} name={name} description={description} logoUrl={logoUrl} />
                ))}
            </div>
        </div>
    );
}

export default CompanyList;
