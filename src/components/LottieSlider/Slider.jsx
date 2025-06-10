import React from 'react';
import Marquee from 'react-fast-marquee';
import Lottie from 'lottie-react';

import socialPlatform from '../../assets/lottie/social.json';
import coding from '../../assets/lottie/coding.json';
import appleLottie from '../../assets/lottie/reg.json';

const Slider = () => {
  const lotties = [
    { id: 1, label: 'Social', animationData: socialPlatform },
    { id: 2, label: 'Coding Now', animationData: coding },
    { id: 3, label: 'Apple', animationData: appleLottie },
    { id: 4, label: 'Apple', animationData: appleLottie },
    { id: 5, label: 'Apple', animationData: appleLottie },
    { id: 6, label: 'Apple', animationData: appleLottie },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-10">
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="gap-6"
      >
        {lotties.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center  border border-gray-200 shadow-md hover:shadow-xl rounded-2xl p-6  mx-3 transform transition-transform duration-300 hover:scale-105"
          >
            <Lottie
              animationData={item.animationData}
              loop
              autoplay
              style={{ height: 240, width: 240 }}
            />
            <p className="mt-5 text-lg font-bold  text-center tracking-wide">
              {item.label}
            </p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Slider;
