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
import GameBoard, { GameStats } from '@/app/game/star/round/components/GameBoard';

const Round = () => {
  const [overlayStep, setOverlayStep] = useState(0); // 0=ROUND, 1=준비, 2=시작, 3=터치, 4=게임, 5=CLEAR, 6=GAMEOVER
  const [gameStarted, setGameStarted] = useState(false);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

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

  // 라운드 오버레이 순서 (ROUND → 준비 → 시작 → 터치)
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

  // 게임 시작
  const handleOverlayClick = () => {
    if (overlayStep === 3) {
      setOverlayStep(4);

      setTimeout(() => {
        setGameStarted(true);
      }, 800);
    }
  };

  // 시간 초과 → 게임 오버
  const handleTimeOver = () => {
    setTimerRunning(false);
    setGameStarted(false);
    setOverlayStep(6); // “GAME OVER”
  };

  // 다시 시작
  const handleRestart = () => {
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

  // 오버레이 텍스트
  const overlayText =
    overlayStep === 0
      ? `${round} ROUND`
      : overlayStep === 1
        ? '준비'
        : overlayStep === 2
          ? '시작!'
          : overlayStep === 5
            ? 'ROUND CLEAR!'
            : overlayStep === 6
              ? 'GAME OVER'
              : '';

  const overlayColor = overlayStep === 6 ? '#FF4D4D' : overlayStep === 5 ? '#FFD23C' : '#F6A000';

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* 오버레이 */}
      <AnimatePresence>
        {overlayStep !== 4 && (
          <motion.div
            key={overlayStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center font-malrang z-[90] bg-black/60"
          >
            {/* 기본 텍스트 */}
            {[0, 1, 2, 5, 6].includes(overlayStep) && (
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

            {/* 터치 안내 단계 */}
            {overlayStep === 3 && (
              <div className="absolute left-1/2 -translate-x-1/2 top-7 z-[50]">
                <div className="flex flex-col items-center gap-3">
                  <p className="font-malrang text-[40px] text-[#FAFAFA] opacity-0">
                    {round}라운드: 인지단계
                  </p>

                  {/* Progress Bar */}
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

                  {/* 손가락 이미지 */}
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

            {/* 게임오버 모달 */}
            {overlayStep === 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6 mt-10"
              >
                <p className="text-[#FFECEC] text-4xl font-bold font-nanum">
                  당신의 점수: <span className="text-[#FFB923]">{score}</span> 점
                </p>
                <button
                  onClick={handleRestart}
                  className="bg-[#FFB923] text-[#452100] text-3xl font-malrang px-12 py-4 rounded-2xl hover:scale-105 transition-all"
                >
                  다시 시작하기
                </button>
              </motion.div>
            )}

            {overlayStep === 7 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6 mt-10"
              >
                <p className="text-[#FFECEC] text-5xl font-bold font-nanum">🎉 GAME CLEAR!</p>
                <p className="text-[#FFECEC] text-3xl font-bold font-nanum">
                  총 점수: <span className="text-[#FFB923]">{score}</span> 점
                </p>

                <button
                  onClick={handleRestart}
                  className="bg-[#FFB923] text-[#452100] text-3xl font-malrang px-12 py-4 rounded-2xl hover:scale-105 transition-all"
                >
                  다시 하기
                </button>
              </motion.div>
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

          {/* Progress Bar */}
          <div className="relative w-[600px] h-[100px]">
            <Image src={starGameProgressBarImage} alt="progress-bar" width={650} className="z-0" />
            <div className="absolute inset-0 left-[90px] top-10">
              <ProgressBar progress={progress} type="starGame" />
            </div>
          </div>

          {/* Game Board */}
          <div className="relative w-[616px] h-[450px] rounded-3xl bg-black/10 flex items-center justify-center p-5 z-[50]">
            <div className="w-full h-full rounded-3xl bg-white/10 flex items-center justify-center p-5">
              <div className="w-full h-full bg-[#2D3165]/70 rounded-3xl blur-sm"></div>
            </div>

            {gameStarted && (
              <GameBoard
                key={round}
                round={round}
                setScore={setScore}
                onMemoryEnd={() => {
                  // 인지단계가 끝난 후 → 타이머 시작
                  const newTime = Math.max(5, 12.5 - round * 0.5);
                  setTimeLeft(newTime);
                  setProgress(100);
                  setTimerRunning(true);
                }}
                onRoundComplete={(stats) => {
                  setTimerRunning(false);
                  setOverlayStep(5);
                  setGameStarted(false);

                  // 통계 합산 (라운드별 누적)
                  setTotalStats((prev) => ({
                    totalClicks: prev.totalClicks + stats.totalClicks,
                    wrongClicks: prev.wrongClicks + stats.wrongClicks,
                    correctClicks: prev.correctClicks + stats.correctClicks,
                    successRounds: prev.successRounds + stats.successRounds,
                  }));

                  console.log('라운드 통계:', stats);
                  console.log('현재까지 누적 통계:', {
                    totalClicks: totalStats.totalClicks + stats.totalClicks,
                    wrongClicks: totalStats.wrongClicks + stats.wrongClicks,
                    correctClicks: totalStats.correctClicks + stats.correctClicks,
                    successRounds: totalStats.successRounds + stats.successRounds,
                  });

                  // 마지막 라운드면 게임 클리어 처리
                  if (round >= 10) {
                    setTimeout(() => {
                      setOverlayStep(7); // “GAME CLEAR”
                      console.log('🎉 전체 게임 누적 통계:', {
                        totalClicks: totalStats.totalClicks + stats.totalClicks,
                        wrongClicks: totalStats.wrongClicks + stats.wrongClicks,
                        correctClicks: totalStats.correctClicks + stats.correctClicks,
                        successRounds: totalStats.successRounds + stats.successRounds,
                      });
                    }, 2000);
                    return;
                  }

                  // 다음 라운드로 이동
                  setTimeout(() => {
                    setRound((r) => r + 1);
                  }, 2000);
                }}
              />
            )}
          </div>

          <p className="text-[36px] text-[#F3ECCF] mt-2 font-extrabold z-[50] relative whitespace-nowrap">
            아기별이 등장하는 위치와 순서를 기억해봐!
          </p>
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
