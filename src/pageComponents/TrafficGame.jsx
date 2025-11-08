import React from 'react';
import Image from 'next/image';
import Description from '@/components/trafficGame/Description';
import trafficBackground from '@/assets/images/traffic-background-on.png';

const TrafficGame = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src={trafficBackground}
        alt="교통안전 학습 배경"
        fill
        priority
        className="object-cover"
      />
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center">
        <Description onClickNext={() => {}} children="도로 위의 질서가 엉망이 되었어. 이러다간 주민들이 불편을 겪게 될거야!" title="신호등"/>
      </div>
    </div>
  );
};

export default TrafficGame;
