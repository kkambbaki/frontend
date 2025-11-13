'use client';

import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
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
import { endStarGame, startStarGame } from '@/lib/api/game/star/starApi';

const Round = () => {
  const router = useRouter();

  const [overlayStep, setOverlayStep] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

  // 결과 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 타이머 관련
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerRunning, setTimerRunning] = useState(false);

  // useRef로 실시간 통계 관리 (상태 업데이트 지연 문제 해결)
  const statsRef = useRef<GameStats>({
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

  // 게임 종료 API 호출
  const handleGameEnd = async () => {
    if (isSaved) {
      console.log('이미 저장된 게임입니다.');
      return;
    }

    const sessionId = window.sessionStorage.getItem('gameSessionId');

    if (!sessionId) {
      console.error('❌ sessionId가 없습니다.');
      return;
    }

    try {
      const payload = {
        sessionId,
        score: statsRef.current.correctClicks,
        wrongCount: statsRef.current.wrongClicks,
        reactionMsSum: 0,
        roundCount: statsRef.current.successRounds,
        successCount: statsRef.current.correctClicks,
      };

      console.log('📊 전송할 최종 통계:', payload);
      const res = await endStarGame(payload);
      console.log('✅ 게임 종료 성공:', res);
      window.sessionStorage.removeItem('gameSessionId'); // sessionId 제거
      setIsSaved(true);
    } catch (error) {
      console.error('❌ 게임 종료 실패:', error);
    }
  };

  // 인지 단계 클릭
  const handleOverlayClick = () => {
    if (overlayStep === 3) {
      setOverlayStep(4);
      setTimeout(() => {
        setGameStarted(true);
      }, 800);
    }
  };

  // 시간 초과 시
  const handleTimeOver = async () => {
    if (round >= 10) return;

    setTimerRunning(false);
    setGameStarted(false);

    // 현재 라운드는 실패이므로 이전 라운드까지만 성공
    statsRef.current.successRounds = round - 1;

    console.log('⏰ 시간 초과! 최종 통계:', statsRef.current);
    await handleGameEnd();
    setIsModalOpen(true);
  };

  const handleRestart = async () => {
    try {
      setIsModalOpen(false);
      setScore(0);
      setRound(1);
      setOverlayStep(0);
      setProgress(100);
      setTimerRunning(false);
      setIsSaved(false);

      // 통계 초기화
      statsRef.current = {
        totalClicks: 0,
        wrongClicks: 0,
        correctClicks: 0,
        successRounds: 0,
      };

      // 기존 세션 제거
      window.sessionStorage.removeItem('gameSessionId');

      // 새 세션 발급
      const res = await startStarGame();
      window.sessionStorage.setItem('gameSessionId', res.sessionId);

      // 오버레이 단계 초기화
      const timers = [
        setTimeout(() => setOverlayStep(1), 1500),
        setTimeout(() => setOverlayStep(2), 3000),
        setTimeout(() => setOverlayStep(3), 4500),
      ];
      return () => timers.forEach(clearTimeout);
    } catch (error) {
      console.error('❌ 다시하기 중 세션 재발급 실패:', error);
      alert('새 게임을 시작할 수 없습니다. 다시 시도해주세요.');
    }
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
            onClose={() => {
              window.sessionStorage.removeItem('gameSessionId');
              router.push('/main');
            }}
            onRetry={() => {
              handleRestart();
            }}
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
                onRoundComplete={async (roundStats) => {
                  setTimerRunning(false);
                  setGameStarted(false);
                  setOverlayStep(5);

                  // 🔥 라운드 통계 누적
                  statsRef.current.totalClicks += roundStats.totalClicks;
                  statsRef.current.wrongClicks += roundStats.wrongClicks;
                  statsRef.current.correctClicks += roundStats.correctClicks;
                  statsRef.current.successRounds += roundStats.successRounds;

                  console.log(`🎯 ${round}라운드 완료! 누적 통계:`, statsRef.current);

                  if (round >= 10) {
                    console.log('🎉 게임 클리어! 최종 통계 저장 중...');
                    await handleGameEnd();
                    setTimeout(() => setIsModalOpen(true), 1500);
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
        <Image
          src={backButton}
          alt="back-button"
          width={120}
          priority
          onClick={() => {
            window.sessionStorage.removeItem('gameSessionId');
            router.push('/main');
          }}
        />
      </div>
    </div>
  );
};

export default Round;
