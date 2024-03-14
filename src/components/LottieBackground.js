import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottieBackground = ({ animationData }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg', // Utilisez 'svg' ou 'canvas' selon vos besoins
        loop: true,
        autoplay: true,
        animationData: animationData, // Passer les données d'animation ici
      });
    }
  }, [animationData]);

  return <div ref={containerRef} />;
};

export default LottieBackground;
