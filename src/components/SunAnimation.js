import React from 'react';

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

const SunAnimation = ({ sunrise, sunset }) => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const sunriseHour = new Date(sunrise * 1000).getHours();
  const sunriseMinute = new Date(sunrise * 1000).getMinutes();
  const sunsetHour = new Date(sunset * 1000).getHours();
  const sunsetMinute = new Date(sunset * 1000).getMinutes();

  const sunriseTotalMinutes = sunriseHour * 60 + sunriseMinute;
  const sunsetTotalMinutes = sunsetHour * 60 + sunsetMinute;
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  let sunPositionPercentage = 0;
  if (currentTotalMinutes <= sunriseTotalMinutes) {
    sunPositionPercentage = 0;
  } else if (currentTotalMinutes >= sunsetTotalMinutes) {
    sunPositionPercentage = 100;
  } else {
    sunPositionPercentage = ((currentTotalMinutes - sunriseTotalMinutes) / (sunsetTotalMinutes - sunriseTotalMinutes)) * 100;
  }

  return (
    <div className="sun-animation">
      <div className="arc"></div>
      <div className="sun" style={{ left: `${sunPositionPercentage}%` }}>
        <img
          className='sunrise-icon'
          src={"./assets/coucherDuSoleil.png"}
          alt="icon-sunrise"
        />
        <img
          className='sunset-icon'
          src={"./assets/leverDuSoleil.png"}
          alt="icon-sunrise"
        />
      </div>
      <div className="sunrise-time">{formatTime(sunrise)}</div>
      <div className="sunset-time">{formatTime(sunset)}</div>
    </div>
  );
};

export default SunAnimation;
