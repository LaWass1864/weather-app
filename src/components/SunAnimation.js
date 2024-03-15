import React, { useState, useEffect } from 'react';

const SunAnimation = ({ sunrise, sunset }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const totalMinutes = (sunset - sunrise) / (1000 * 60); // Convert milliseconds to minutes
      const elapsedMinutes = (now - sunrise) / (1000 * 60);
      const currentProgress = (elapsedMinutes / totalMinutes) * 100;
      setProgress(currentProgress);
    };

    calculateProgress(); // Calculate progress initially

    const interval = setInterval(calculateProgress, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [sunrise, sunset]);

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress blue"
          style={{
            width: `${Math.min(progress, 50)}%`, // Limit to 50% or current progress, whichever is smaller
          }}
        ></div>
        <div
          className="progress orange"
          style={{
            width: `${Math.max(0, progress - 50)}%`, // Start from 0 if progress is less than 50%
          }}
        ></div>
      </div>
    </div>
  );
};

export default SunAnimation;
