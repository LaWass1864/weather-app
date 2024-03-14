import React from 'react';


const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convertir le timestamp en millisecondes
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};
const SunAnimation = ({ sunrise, sunset }) => {
  // Heure actuelle (remplacez par l'heure réelle)
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  
  // Convertir les heures de lever et de coucher du soleil en heures et minutes
  const sunriseHour = new Date(sunrise * 1000).getHours();
  const sunriseMinute = new Date(sunrise * 1000).getMinutes();
  const sunsetHour = new Date(sunset * 1000).getHours();
  const sunsetMinute = new Date(sunset * 1000).getMinutes();
  
  // Calculer la position du soleil sur l'arc en fonction de l'heure actuelle
  const sunriseTotalMinutes = sunriseHour * 60 + sunriseMinute;
  const sunsetTotalMinutes = sunsetHour * 60 + sunsetMinute;
  const currentTotalMinutes = currentHour * 60 + currentMinute;
  const daylightDuration = sunsetTotalMinutes - sunriseTotalMinutes;
  const sunPositionPercentage = ((currentTotalMinutes - sunriseTotalMinutes) / daylightDuration) * 100;
  
  return (
    <div className="sun-animation">
    <div className="arc"></div>
    <div className="sun" style={{ left: `${sunPositionPercentage}%` }}></div>
    {/* Heure du lever du soleil en bas à gauche */}
    <div className="sunrise-time">{formatTime(sunrise)}</div>
    {/* Heure du coucher du soleil en bas à droite */}
    <div className="sunset-time">{formatTime(sunset)}</div>
    {/* icone lever du soleil */}
    <img
      className='sunrise-icon'
      src={"./assets/coucherDuSoleil.png"}
      alt="icon-sunrise"
    />
    {/* icone lever du soleil */}
    <img
      className='sunset-icon'
      src={"./assets/leverDuSoleil.png"}
      alt="icon-sunrise"
    />
  </div>
  );
};

export default SunAnimation;
