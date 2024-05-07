import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';

const TestPage = () => {
    const [health, setHealth] = useState(null);

    useEffect(() => {
        fetch("/health")
            .then((res) => res.json())
            .then((health) => {
                console.log(health);
                setHealth(health.message);
            });
    }, []);

    return (
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt="logo" />
            <p>{!health ? "Loading..." : health}</p>
          </header>
        </div>
    );
};

export default TestPage;
