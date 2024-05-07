import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExampleComponent from '../components/ExampleComponent';

const ExamplePage = () => {
    const [examples, setExamples] = useState([]);

    useEffect(() => {
        fetch("/get")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setExamples(data);
            })
            .catch(err => console.error('Error fetching examples:', err));
    }, []);

    return (
        <div>
            <h1>Example Page</h1>
            {examples.map(example => (
                <ExampleComponent key={example._id} example={example} />
            ))}
        </div>
    );
};

export default ExamplePage;
