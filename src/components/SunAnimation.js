import React, { useState, useEffect } from 'react';

const SunAnimation = ({ sunrise, sunset }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date(); // Date actuelle
      const sunriseTime = new Date(sunrise * 1000); // Convertir le timestamp du lever du soleil en millisecondes
      const sunsetTime = new Date(sunset * 1000); // Convertir le timestamp du coucher du soleil en millisecondes

      // Vérifier si l'heure actuelle est entre le lever et le coucher du soleil
      if (now >= sunriseTime && now <= sunsetTime) {
        const totalMinutes = (sunsetTime - sunriseTime) / (1000 * 60); // Convertir la différence en minutes
        const elapsedMinutes = (now - sunriseTime) / (1000 * 60); // Convertir le temps écoulé en minutes
        const currentProgress = (elapsedMinutes / totalMinutes) * 100; // Calculer le pourcentage de progression
        setProgress(currentProgress);
      }
    };

    calculateProgress(); // Calculer la progression initiale

    const interval = setInterval(calculateProgress, 60000); // Mettre à jour toutes les minutes

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
  }, [sunrise, sunset]);


  return (
    <div className="progress-container">
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress blue"
            style={{
              width: `${Math.min(progress, 50)}%`, // Limiter à 50% ou la progression actuelle, selon le plus petit
            }}
          ></div>
          <div
            className="progress orange"
            style={{
              width: `${Math.max(0, progress - 50)}%`, // Commencer à 0 si la progression est inférieure à 50%
            }}
          ></div>
        </div>
      </div>

    </div>
  );
};

export default SunAnimation;
