'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import starGameBackgroundImage from '@/assets/images/star-game-backgroundimage.png';
import starGameProgressBarImage from '@/assets/images/progress-bar.png';
import backButton from '@/assets/icons/back.svg';
import star from '@/assets/images/star.png';
import ProgressBar from '@/app/loading/components/ProgressBar';
import { motion, AnimatePresence } from 'framer-motion';
import fingerImage from '@/assets/images/finger.png';

const Round1 = () => {
  const [overlayStep, setOverlayStep] = useState(0); // 0=1Round, 1=준비, 2=시작, 3=터치, 4=완료

  useEffect(() => {
    const timers = [
      setTimeout(() => setOverlayStep(1), 5000),
      setTimeout(() => setOverlayStep(2), 10000),
      setTimeout(() => setOverlayStep(3), 15000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleOverlayClick = () => {
    if (overlayStep === 3) setOverlayStep(4);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* 오버레이 */}
      <AnimatePresence>
        {overlayStep < 4 && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 flex flex-col items-center justify-center font-malrang z-[90] ${
              overlayStep === 3 ? 'bg-black/50 pointer-events-none' : 'bg-black/50'
            }`}
          >
            {overlayStep === 0 && (
              <p
                className="text-[128px] font-extrabold"
                style={{
                  background: 'linear-gradient(to bottom, #FFB923, #F6A000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitTextStroke: '7px #994802',
                }}
              >
                1 ROUND
              </p>
            )}

            {overlayStep === 1 && (
              <p
                className="text-[128px] font-extrabold"
                style={{
                  background: 'linear-gradient(to bottom, #FFB923, #F6A000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitTextStroke: '7px #994802',
                }}
              >
                준비
              </p>
            )}

            {overlayStep === 2 && (
              <p
                className="text-[128px] font-extrabold"
                style={{
                  background: 'linear-gradient(to bottom, #FFB923, #F6A000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitTextStroke: '7px #994802',
                }}
              >
                시작!
              </p>
            )}

            {overlayStep === 3 && (
              <div className="relative flex flex-col items-center gap-3 top-22">
                <div className="flex flex-col items-center pointer-events-none absolute z-50 -right-10 bottom-20">
                  <Image
                    src={fingerImage}
                    alt="finger"
                    width={150}
                    height={150}
                    className="animate-bounce"
                  />
                </div>

                <div
                  className="relative w-[616px] h-[450px] rounded-3xl bg-black/10 flex items-center justify-center p-5 cursor-pointer pointer-events-auto"
                  onClick={handleOverlayClick}
                >
                  <div className="w-full h-full rounded-3xl bg-white/10 flex items-center justify-center p-5">
                    <div className="w-full h-full bg-[#2D3165]/70 rounded-3xl flex items-center justify-center blur-sm"></div>
                  </div>

                  <div className="absolute w-4 h-32 bg-[#D9D9D9] right-8 top-24 rounded-full opacity-15"></div>
                  <div className="absolute w-4 h-3 bg-[#D9D9D9] right-8 top-[78px] rounded-full opacity-15"></div>

                  <div className="absolute grid grid-cols-3 grid-rows-3 gap-6 gap-x-12">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <Image key={i} src={star} alt={`star-${i}`} width={110} height={110} />
                    ))}
                  </div>
                </div>

                <p className="text-[36px] text-[#F3ECCF] mt-2 font-extrabold font-nanum">
                  아기별이 등장하는 위치와 순서를 기억해봐!
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 뒤로가기 버튼 */}
      <div className="absolute top-10 left-16 z-[60] cursor-pointer hover:scale-105 transition-transform">
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

      {/* 점수 */}
      <div className="text-[#F0F0F0] font-malrang absolute flex items-center gap-5 right-10 top-10 z-[60]">
        <p className="text-[40px]">점수</p>
        <p
          className="text-[64px] font-extrabold"
          style={{
            WebkitTextStroke: '4px #9F4A11',
            WebkitTextFillColor: '#FFC738',
          }}
        >
          24
        </p>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-7 z-[50]">
        <div className="flex flex-col items-center gap-3">
          <p className="font-malrang text-[40px] text-[#FAFAFA]">1라운드: 인지단계</p>

          <div className="relative w-[600px] h-[100px]">
            <Image src={starGameProgressBarImage} alt="progress-bar" width={650} className="z-0" />
            <div className="absolute inset-0 left-[90px] top-10">
              <ProgressBar progress={100} type="starGame" />
            </div>
          </div>

          {/* 별 상자 */}
          <div className="relative w-[616px] h-[450px] rounded-3xl bg-black/10 flex items-center justify-center p-5 z-[50]">
            <div className="w-full h-full rounded-3xl bg-white/10 flex items-center justify-center p-5">
              <div className="w-full h-full bg-[#2D3165]/70 rounded-3xl flex items-center justify-center blur-sm"></div>
            </div>

            <div className="absolute w-4 h-32 bg-[#D9D9D9] right-8 top-24 rounded-full opacity-15"></div>
            <div className="absolute w-4 h-3 bg-[#D9D9D9] right-8 top-[78px] rounded-full opacity-15"></div>

            <div className="absolute grid grid-cols-3 grid-rows-3 gap-6 gap-x-12">
              {Array.from({ length: 9 }).map((_, i) => (
                <Image key={i} src={star} alt={`star-${i}`} width={110} height={110} />
              ))}
            </div>
          </div>

          {/* 안내 문구 */}
          <p className="text-[36px] text-[#F3ECCF] mt-2 font-extrabold z-[50] relative">
            아기별이 등장하는 위치와 순서를 기억해봐!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Round1;
