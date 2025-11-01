'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ProgressBar from './components/ProgressBar';

const Page = () => {
  const [progress, setProgress] = useState(0);
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOn((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // TODO: API 연동 시 수정 필요
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-screen py-20 px-10 flex flex-col justify-around">
      <div className="flex flex-col items-center gap-10">
        <div className="relative w-[180px] h-[180px] max-md:w-[150px] max-md:h-[150px]">
          {/* 켜진 전구 */}
          <Image
            src="/bulb.png"
            alt="On bulb"
            fill
            className={`object-contain transition-opacity duration-700 ease-in-out ${
              isOn ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* 꺼진 전구 */}
          <Image
            src="/off_bulb.png"
            alt="Off bulb"
            fill
            className={`object-contain transition-opacity duration-700 ease-in-out ${
              isOn ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>
        <p className="font-extrabold text-4xl max-md:text-2xl">
          {progress < 100 ? '집중력 깜빡이는 중...' : '완료!'}
        </p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="font-extrabold text-4xl text-progress-bar-text">{progress}%</p>
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};

export default Page;
