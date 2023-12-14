import React, { useState, useEffect } from 'react';
import './ Preloader.css';

function Preloader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        loading && (
            <div className="preloader">
                <div className="preloader__spinner"/>
            </div>
        )
    );
}

export default Preloader;
