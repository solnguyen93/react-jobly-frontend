import React from 'react';
import { Link } from 'react-router-dom';

function Company({ handle, name, description, logoUrl }) {
    return (
        <Link to={`/companies/${handle}`} className="card-link">
            <div className="card-container">
                <div className="card-content">
                    <div className="card-info">
                        <div className="card-name">{name}</div>
                        <div className="card-description">{description}</div>
                    </div>
                    <img src={logoUrl} alt="Company Logo" className="card-logo" />
                </div>
            </div>
        </Link>
    );
}

export default Company;
