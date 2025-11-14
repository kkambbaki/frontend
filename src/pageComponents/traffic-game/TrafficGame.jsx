'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Description from '@/components/trafficGame/Description';
import trafficBackground from '@/assets/images/traffic-background-on.png';
import backImg from '@/assets/icons/back.svg';
import { useRouter } from 'next/navigation';

const TrafficGame = () => {
  const router = useRouter();
  const { currentSentence, handleNext } = useTrafficNarration(() =>
    router.push('/game/traffic/round')
  );

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
        <Image
          className="absolute left-[80px] top-[50px] z-20 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          src={backImg}
          alt="뒤로가기"
          width={120}
          height={120}
          priority
          onClick={() => router.replace('/main')}
        />
        <div className="absolute bottom-[100px] left-1/2 w-full -translate-x-1/2 px-29">
          <Description title="신호등" onClickNext={handleNext} className="w-full">
            {currentSentence}
          </Description>
        </div>
      </div>
    </div>
  );
};

export default TrafficGame;

const SENTENCES = [
  '도로 위의 질서가 엉망이 되었어. 이러다간 주민들이 불편을 겪게 될거야!',
  '버튼을 눌러서 초록불엔 자동차가 출발 할 수 있도록 하고, 빨간 불엔 자동차가 멈추게 해야해!',
  '신호를 지킬때 마다 1점씩 점수가 올라가고, 3번 신호를 어기면 게임이 종료돼.',
  '나와 함께 교통 지킴이가 되어 도시의 안전을 지켜줄래?',
];

const useTrafficNarration = (onComplete) => {
  const [sentenceIndex, setSentenceIndex] = useState(0);

  const handleNext = useCallback(() => {
    const lastIndex = SENTENCES.length - 1;
    if (sentenceIndex >= lastIndex) {
      onComplete();
      return;
    }
    setSentenceIndex((prev) => Math.min(prev + 1, lastIndex));
  }, [sentenceIndex, onComplete]);

  const currentSentence = useMemo(() => SENTENCES[sentenceIndex], [sentenceIndex]);

  return {
    currentSentence,
    handleNext,
  };
};
