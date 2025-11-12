'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import star from '@/assets/images/star.png';

export type GameStats = {
  totalClicks: number;
  wrongClicks: number;
  correctClicks: number;
  successRounds: number;
};

interface GameBoardProps {
  round: number;
  statsRef: React.RefObject<GameStats>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  onRoundComplete: (stats: GameStats) => void;
  onMemoryEnd: () => void;
}

export default function GameBoard({
  round,
  setScore,
  statsRef,
  onRoundComplete,
  onMemoryEnd,
}: GameBoardProps) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStar, setActiveStar] = useState<number | null>(null);
  const [poppedStars, setPoppedStars] = useState<number[]>([]);
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    startRound();
  }, []);

  function generateSequence(length: number) {
    const arr = Array.from({ length: 9 }, (_, i) => i);
    const shuffled = arr.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, length);
  }

  async function playSequence(seq: number[]) {
    setIsPlaying(true);
    for (const idx of seq) {
      setActiveStar(idx);
      await new Promise((res) => setTimeout(res, 600));
      setActiveStar(null);
      await new Promise((res) => setTimeout(res, 300));
    }
    setIsPlaying(false);
    onMemoryEnd();
  }

  function startRound() {
    const seq = generateSequence(round + 2);
    setSequence(seq);
    setUserInput([]);
    setPoppedStars([]);

    // 라운드 시작 시 통계 초기화
    statsRef.current = {
      totalClicks: 0,
      wrongClicks: 0,
      correctClicks: 0,
      successRounds: 0,
    };

    playSequence(seq);
  }

  function handleStarClick(index: number) {
    if (isPlaying) return;

    const expected = sequence[userInput.length];

    // 클릭 즉시 통계에 반영
    statsRef.current.totalClicks += 1;

    if (index !== expected) {
      // 틀렸을 때
      statsRef.current.wrongClicks += 1;

      console.log('❌ 오답 클릭! 현재 통계:', statsRef.current);

      setWrongIndex(index);
      setShake(true);
      setTimeout(() => {
        setWrongIndex(null);
        setShake(false);
      }, 300);
      return;
    }

    // 정답 클릭
    statsRef.current.correctClicks += 1;
    setUserInput((prev) => [...prev, index]);
    setScore((prev) => prev + 1);
    setPoppedStars((prev) => [...prev, index]);

    console.log('✅ 정답 클릭! 현재 통계:', statsRef.current);

    // 모든 별 클릭 완료
    if (userInput.length + 1 === sequence.length) {
      console.log('🎉 라운드 클리어! 최종 통계:', statsRef.current);
      setTimeout(() => onRoundComplete(statsRef.current), 1000);
    }
  }

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center transition-transform duration-200 ${
        shake ? 'animate-shake' : ''
      }`}
    >
      <div className="grid grid-cols-3 gap-6 gap-x-12">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            onClick={() => handleStarClick(i)}
            className={`transition-all cursor-pointer relative ${
              activeStar === i
                ? 'scale-110 brightness-125'
                : wrongIndex === i
                  ? 'bg-red-500/40 rounded-full scale-110'
                  : ''
            }`}
          >
            <div
              className={`transition-all duration-500 ${
                poppedStars.includes(i) ? 'opacity-0 scale-150 blur-md' : 'opacity-100 scale-100'
              }`}
            >
              <Image src={star} alt={`star-${i}`} width={110} height={110} />
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translate(0);
          }
          25% {
            transform: translate(-10px, 0);
          }
          50% {
            transform: translate(10px, 0);
          }
          75% {
            transform: translate(-10px, 0);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
