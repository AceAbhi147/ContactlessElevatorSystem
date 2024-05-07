import React from 'react';

const ExampleComponent = ({ example }) => {
    return (
        <div>
            <h3>{example.name}</h3>
            <p>{example.description}</p>
        </div>
    );
};

export default ExampleComponent;
