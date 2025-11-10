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
import GameBoard, { GameStats } from '@/pageComponents/star-game/round/components/GameBoard';
import ScoreBoard from '@/components/common/ScoreBoard';
import { useRouter } from 'next/navigation';

const Round = () => {
  const router = useRouter();

  const [overlayStep, setOverlayStep] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

  // 결과 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 타이머 관련
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);

  // 기록용
  const [totalStats, setTotalStats] = useState<GameStats>({
    totalClicks: 0,
    wrongClicks: 0,
    correctClicks: 0,
    successRounds: 0,
  });

  // 타이머 감소 로직
  useEffect(() => {
    if (!timerRunning) return;

    const totalTime = timeLeft * 1000;
    const tick = 100;
    const step = 100 / (totalTime / tick);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) {
          clearInterval(interval);
          setTimerRunning(false);
          handleTimeOver();
          return 0;
        }
        return p - step;
      });
    }, tick);

    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  // 라운드 시작 오버레이 순서
  useEffect(() => {
    setOverlayStep(0);
    setGameStarted(false);
    setTimerRunning(false);
    setProgress(100);

    const timers = [
      setTimeout(() => setOverlayStep(1), 1500),
      setTimeout(() => setOverlayStep(2), 3000),
      setTimeout(() => setOverlayStep(3), 4500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [round]);

  // 인지 단계 클릭
  const handleOverlayClick = () => {
    if (overlayStep === 3) {
      setOverlayStep(4);
      setTimeout(() => {
        setGameStarted(true);
      }, 800);
    }
  };

  // 시간 초과 시 모달 오픈
  const handleTimeOver = () => {
    setTimerRunning(false);
    setGameStarted(false);
    setIsModalOpen(true);
  };

  const handleRestart = () => {
    setIsModalOpen(false);
    setScore(0);
    setRound(1);
    setOverlayStep(0);
    setProgress(100);
    setTimerRunning(false);

    const timers = [
      setTimeout(() => setOverlayStep(1), 1500),
      setTimeout(() => setOverlayStep(2), 3000),
      setTimeout(() => setOverlayStep(3), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  };

  const overlayText =
    overlayStep === 0
      ? `${round} ROUND`
      : overlayStep === 1
        ? '준비'
        : overlayStep === 2
          ? '시작!'
          : overlayStep === 5
            ? 'ROUND CLEAR!'
            : '';

  const overlayColor = overlayStep === 5 ? '#FFD23C' : '#F6A000';

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-[200] bg-black/60">
          <ScoreBoard
            type="star"
            score={score}
            onClose={() => router.push('/main')}
            onRetry={handleRestart}
          />
        </div>
      )}

      <AnimatePresence>
        {overlayStep !== 4 && !isModalOpen && (
          <motion.div
            key={overlayStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center font-malrang z-[90] bg-black/60"
          >
            {/* ROUND~CLEAR 텍스트 */}
            {[0, 1, 2, 5].includes(overlayStep) && (
              <motion.p
                key={overlayText}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-[128px] font-extrabold"
                style={{
                  background: `linear-gradient(to bottom, ${overlayColor}, #994802)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitTextStroke: '7px #994802',
                }}
              >
                {overlayText}
              </motion.p>
            )}

            {/* 인지단계 안내 (손가락 + 텍스트 유지) */}
            {overlayStep === 3 && (
              <div className="absolute left-1/2 -translate-x-1/2 top-7 z-[50]">
                <div className="flex flex-col items-center gap-3">
                  <p className="font-malrang text-[40px] text-[#FAFAFA] opacity-0">
                    {round}라운드: 인지단계
                  </p>

                  <div className="relative w-[600px] h-[100px] opacity-0">
                    <Image
                      src={starGameProgressBarImage}
                      alt="progress-bar"
                      width={650}
                      className="z-0"
                    />
                    <div className="absolute inset-0 left-[90px] top-10">
                      <ProgressBar progress={progress} type="starGame" />
                    </div>
                  </div>

                  {/* 손가락 애니메이션 */}
                  <div className="flex flex-col items-center pointer-events-none absolute z-50 -right-10 bottom-20">
                    <Image
                      src={fingerImage}
                      alt="finger"
                      width={150}
                      height={150}
                      className="animate-bounce"
                    />
                  </div>

                  {/* 클릭 가능한 영역 */}
                  <div
                    className="relative w-[616px] h-[450px] rounded-3xl bg-black/10 flex items-center justify-center p-5 cursor-pointer pointer-events-auto"
                    onClick={handleOverlayClick}
                  >
                    <div className="absolute grid grid-cols-3 grid-rows-3 gap-6 gap-x-12">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <Image key={i} src={star} alt={`star-${i}`} width={110} height={110} />
                      ))}
                    </div>
                  </div>

                  <p className="text-[36px] text-[#F3ECCF] mt-2 font-extrabold z-[50] font-nanum whitespace-nowrap">
                    아기별이 등장하는 위치와 순서를 기억해봐!
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 배경 */}
      <Image
        src={starGameBackgroundImage}
        alt="Star Game Background"
        fill
        style={{ objectFit: 'cover' }}
        priority
      />

      {/* 점수 표시 */}
      <div className="text-[#F0F0F0] font-malrang absolute flex items-center gap-5 right-10 top-10 z-[60]">
        <p className="text-[40px]">점수</p>
        <p
          className="text-[64px] font-extrabold"
          style={{
            WebkitTextStroke: '4px #9F4A11',
            WebkitTextFillColor: '#FFC738',
          }}
        >
          {score}
        </p>
      </div>

      {/* 게임 메인 영역 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-7 z-[50]">
        <div className="flex flex-col items-center gap-3">
          <p className="font-malrang text-[40px] text-[#FAFAFA]">{round}라운드: 인지단계</p>

          <div className="relative w-[600px] h-[100px]">
            <Image src={starGameProgressBarImage} alt="progress-bar" width={650} className="z-0" />
            <div className="absolute inset-0 left-[90px] top-10">
              <ProgressBar progress={progress} type="starGame" />
            </div>
          </div>

          {/* Game Board */}
          <div className="relative w-[616px] h-[450px] rounded-3xl bg-black/10 flex items-center justify-center p-5 z-[50]">
            {gameStarted && (
              <GameBoard
                key={round}
                round={round}
                setScore={setScore}
                onMemoryEnd={() => {
                  const newTime = Math.max(5, 12.5 - round * 0.5);
                  setTimeLeft(newTime);
                  setProgress(100);
                  setTimerRunning(true);
                }}
                onRoundComplete={(stats) => {
                  setTimerRunning(false);
                  setGameStarted(false);
                  setOverlayStep(5);

                  setTotalStats((prev) => ({
                    totalClicks: prev.totalClicks + stats.totalClicks,
                    wrongClicks: prev.wrongClicks + stats.wrongClicks,
                    correctClicks: prev.correctClicks + stats.correctClicks,
                    successRounds: prev.successRounds + stats.successRounds,
                  }));

                  // 게임 클리어 시 모달 오픈
                  if (round >= 10) {
                    setTimeout(() => {
                      setIsModalOpen(true);
                    }, 1500);
                    return;
                  }

                  setTimeout(() => {
                    setRound((r) => r + 1);
                  }, 2000);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* 뒤로가기 */}
      <div className="absolute top-10 left-16 z-[60] cursor-pointer hover:scale-105 transition-transform">
        <Image src={backButton} alt="back-button" width={120} priority />
      </div>
    </div>
  );
};

export default Round;
