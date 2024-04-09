import React from 'react';
import './styles/App.css';
import AppRoutes from './components/Routes';
import UserProvider from './context/UserProvider';

function App() {
    return (
        <div className="App">
            <UserProvider>
                <AppRoutes />
            </UserProvider>
        </div>
    );
}

export default App;
