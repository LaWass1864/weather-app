// SunAnimation.js
import React, { useState, useEffect } from 'react';


const SunAnimation = ({ sunrise, sunset }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculateProgress = () => {
            const now = new Date();
            const sunriseTime = new Date(sunrise * 1000);
            const sunsetTime = new Date(sunset * 1000);
            const totalDayLength = sunsetTime - sunriseTime;
            const elapsedTime = now - sunriseTime;
            const currentProgress = (elapsedTime / totalDayLength) * 100;

            setProgress(currentProgress);
        };

        calculateProgress();

        const interval = setInterval(() => {
            calculateProgress();
        }, 60000); // Mise à jour toutes les minutes

        return () => clearInterval(interval);
    }, [sunrise, sunset]);

    return (
        <div className="sun-animation">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }} />
                <div className="sun" style={{ left: `${progress}%` }} />
            </div>
            
        </div>
    );
};

export default SunAnimation;
