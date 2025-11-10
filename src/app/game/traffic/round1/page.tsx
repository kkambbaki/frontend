'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import PrimaryButton from '@/components/common/PrimaryButton';
import trafficBackground from '@/assets/images/traffic-background.png';
import trafficLightRed from '@/assets/images/traffic-light-red.png';
import trafficLightGreen from '@/assets/images/traffic-light-green.png';
import backImg from '@/assets/icons/back.svg';
import carImage from '@/assets/images/car.png';
import gasGaugeImage from '@/assets/images/gas.png';

const ROUND_CONFIG = [
  { round: 1, changeCount: 5, interval: 4000 },
  { round: 2, changeCount: 5, interval: 3800 },
  { round: 3, changeCount: 5, interval: 3500 },
  { round: 4, changeCount: 5, interval: 3200 },
  { round: 5, changeCount: 5, interval: 3000 },
  { round: 6, changeCount: 5, interval: 2700 },
  { round: 7, changeCount: 5, interval: 2500 },
  { round: 8, changeCount: 5, interval: 2200 },
  { round: 9, changeCount: 5, interval: 2000 },
  { round: 10, changeCount: 5, interval: 1800 },
] as const;

const TrafficRound1Page = () => {
  const router = useRouter();
  const [roundIndex, setRoundIndex] = useState(0);
  const [overlayStep, setOverlayStep] = useState<'round' | 'ready' | 'start' | 'none'>('round');
  const [score, setScore] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [lightState, setLightState] = useState<'red' | 'green'>('red');
  const [buttonsDisabled, setButtonsDisabled] = useState(true);
  const [changeCount, setChangeCount] = useState(0);
  const [isCarMoving, setIsCarMoving] = useState(false);
  const cycleRespondedRef = useRef(false);

  const currentRound = useMemo(() => ROUND_CONFIG[roundIndex], [roundIndex]);
  const isLastRound = roundIndex >= ROUND_CONFIG.length - 1;

  useEffect(() => {
    cycleRespondedRef.current = false;
    setOverlayStep('round');
    setButtonsDisabled(true);
    setLightState('red');
    setIsCarMoving(true);
    const timers = [
      setTimeout(() => setOverlayStep('ready'), 800),
      setTimeout(() => setOverlayStep('start'), 1600),
      setTimeout(() => {
        setOverlayStep('none');
        setButtonsDisabled(false);
        cycleRespondedRef.current = false;
      }, 2400),
    ];

    return () => timers.forEach(clearTimeout);
  }, [roundIndex]);

  const handleBack = () => router.back();

  const registerFail = useCallback(() => {
    setFailCount((prev) => {
      const next = Math.min(prev + 1, 3);
      if (next >= 3) {
        setButtonsDisabled(true);
      }
      return next;
    });
  }, []);

  const advanceRound = useCallback(() => {
    if (isLastRound) {
      setOverlayStep('none');
      setButtonsDisabled(true);
      return;
    }
    setRoundIndex((prev) => prev + 1);
    setFailCount(0);
    setChangeCount(0);
    cycleRespondedRef.current = false;
    setIsCarMoving(true);
  }, [isLastRound]);

  const handleGreen = () => {
    if (buttonsDisabled) return;
    if (lightState !== 'green') {
      cycleRespondedRef.current = true;
      registerFail();
      return;
    }
    if (cycleRespondedRef.current) return;
    cycleRespondedRef.current = true;
    setScore((prev) => prev + 1);
    setIsCarMoving(true);
  };

  const handleRed = () => {
    if (buttonsDisabled) return;
    if (lightState !== 'red') {
      cycleRespondedRef.current = true;
      registerFail();
      return;
    }
    if (cycleRespondedRef.current) return;
    cycleRespondedRef.current = true;
    setScore((prev) => prev + 1);
    setIsCarMoving(false);
  };

  const handleSignalChange = useCallback(() => {
    if (!cycleRespondedRef.current) {
      registerFail();
    }
    cycleRespondedRef.current = false;

    const nextState = lightState === 'red' ? 'green' : 'red';
    setLightState(nextState);
    setIsCarMoving(nextState === 'red');

    setChangeCount((prev) => {
      const next = prev + 1;
      if (next >= currentRound.changeCount) {
        advanceRound();
        return 0;
      }
      return next;
    });
  }, [advanceRound, currentRound.changeCount, registerFail, lightState]);

  useEffect(() => {
    if (overlayStep !== 'none' || failCount >= 3) {
      return;
    }

    const intervalId = setInterval(() => {
      if (!buttonsDisabled) {
        handleSignalChange();
      }
    }, currentRound.interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [overlayStep, failCount, buttonsDisabled, currentRound.interval, handleSignalChange]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence>
        {overlayStep !== 'none' && (
          <motion.div
            key={overlayStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[200] flex items-center justify-center bg-black/40"
          >
            <p
              className="font-malrangiche text-[120px]"
              style={{
                background: 'linear-gradient(180deg, #FFD359 0%, #FF9F1A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '8px #7F4B1F',
              }}
            >
              {overlayStep === 'round' && `${currentRound.round} 라운드`}
              {overlayStep === 'ready' && '준비'}
              {overlayStep === 'start' && '시작!'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Image src={trafficBackground} alt="교통 게임 배경" fill priority className="object-cover" />

      <button
        type="button"
        onClick={handleBack}
        className="absolute left-[80px] top-[50px] z-20 transition-transform hover:scale-105 active:scale-95"
      >
        <Image src={backImg} alt="뒤로가기" width={120} height={120} priority />
      </button>

      <div className="absolute top-[64px] right-[100px] flex items-center gap-[26px]">
        <p className="font-malrangiche text-[30px] text-[#333333]">점수</p>
        <p
          className="font-nanum text-[64px] font-bold text-[#FFC738]"
          style={{
            WebkitTextStrokeWidth: '4px',
            WebkitTextStrokeColor: '#7F4F1A',
          }}
        >
          {score}
        </p>
      </div>

      <div className="absolute top-[100px] left-[250px] flex items-center gap-[18px]">
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={`h-6 w-12 rounded-full border-[4px] border-[#7F4F1A] ${
                idx < failCount ? 'bg-[#E05B4E]' : 'bg-[#FFE6B8]'
              }`}
            />
          ))}
        </div>
      </div>

      <Image
        className="absolute top-[140px] right-0"
        src={lightState === 'green' ? trafficLightGreen : trafficLightRed}
        alt={`신호등_${lightState}`}
        width={988}
        height={150}
      />
      <div className="absolute top-[54px] left-1/2 -translate-x-1/2">
        <p className="font-malrangiche text-[40px] text-white">{currentRound.round} 라운드</p>
      </div>

      <motion.div
        className="absolute bottom-[200px] left-1/2 -translate-x-1/2"
        variants={{
          idle: {
            x: 0,
            y: 0,
            transition: { duration: 0.3, ease: 'easeOut' },
          },
          drive: {
            x: [0, 4, 0, -4, 0],
            y: [0, -22, -4, -16, 0],
            transition: {
              duration: 1.2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            },
          },
        }}
        animate={isCarMoving && failCount < 3 ? 'drive' : 'idle'}
      >
        <div className="relative">
          <Image src={carImage} alt="자동차" width={440} height={360} priority />
          {isCarMoving && failCount < 3 && (
            <motion.div
              className="absolute -right-10 bottom-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Image src={gasGaugeImage} alt="연료 게이지" width={150} height={120} priority />
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="absolute bottom-[120px] left-1/2 flex w-full max-w-[1200px] -translate-x-1/2 justify-between px-[100px]">
        <PrimaryButton variant="lg" color="red" disabled={buttonsDisabled} onClick={handleRed}>
          멈춰!
        </PrimaryButton>
        <PrimaryButton variant="lg" color="green" disabled={buttonsDisabled} onClick={handleGreen}>
          달려!
        </PrimaryButton>
      </div>
    </div>
  );
};

export default TrafficRound1Page;
