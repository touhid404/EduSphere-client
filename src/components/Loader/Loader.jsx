import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    );
};

export default Loader;