import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react-web';


const BackgroundAnimation = () => {
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    const currentHour = new Date().getHours();

    let animationUrl;
    if (currentHour >= 6 && currentHour < 18) {
      animationUrl = 'AnimationJournee.json';
    } else if (currentHour >= 18 && currentHour < 21) {
      animationUrl = 'AnimationSoiree.json';
    } else {
      animationUrl = 'AnimationNuit.json';
    }

    import(`./animations/${animationUrl}`).then((module) => {
      setAnimation(module.default);
    });
  }, []);

  return (
    <div className="background-animation-container">
      {animation && <Lottie animationData={animation} loop autoPlay />}
    </div>
  );
};

export default BackgroundAnimation;
