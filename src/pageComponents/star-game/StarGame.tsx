'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import starGameBackgroundImage from '@/assets/images/star-game-backgroundimage.png';
import starGameCharacter from '@/assets/images/star-game-character.png';
import Description from '@/components/trafficGame/Description';
import backButton from '@/assets/icons/back.svg';

const StarGame = () => {
  const [state, setState] = useState(0); // description state
  const descriptions = [
    '작은 별들이 우주에서 길을 잃었어! 작은 별들이 제자리로 찾아갈 수 있도록 도움이 필요해.',
    '별들이 깜빡이는 위치를 기억해서 순서대로 입력하면 별들이 제자리를 찾아가 별자리가 될 수 있어.',
    '나와 함께 우주탐험대가 되어 작은 별들을 구출해 주겠니?',
  ];

  return (
    <div className="w-full h-screen">
      <div className="absolute top-10 left-16 z-50 cursor-pointer hover:scale-105 transition-transform">
        <Image src={backButton} alt="back-button" width={120} priority />
      </div>

      {/* 배경 이미지 */}
      <Image
        src={starGameBackgroundImage}
        alt="Star Game Background"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />

      <div className="absolute -top-12 left-1/3">
        <Image
          src={starGameCharacter}
          alt="Star Game Character"
          width={650}
          height={200}
          priority
        />
      </div>

      <div className="w-full px-20 absolute bottom-3">
        <Description
          title="별똥이"
          onClickNext={() => {
            if (state < descriptions.length - 1) {
              setState(state + 1);
            }
          }}
        >
          {descriptions[state]}
        </Description>
      </div>
    </div>
  );
};

export default StarGame;
