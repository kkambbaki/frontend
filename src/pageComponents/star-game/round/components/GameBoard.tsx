'use client';

import { useState, useEffect } from 'react';
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
  setScore: React.Dispatch<React.SetStateAction<number>>;
  onRoundComplete: (stats: GameStats) => void;
  onMemoryEnd: () => void; // 인지단계 끝났을 때 (타이머 시작)
}

export default function GameBoard({
  round,
  setScore,
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

  // 기록용
  const [stats, setStats] = useState<GameStats>({
    totalClicks: 0,
    wrongClicks: 0,
    correctClicks: 0,
    successRounds: 0,
  });

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
    playSequence(seq);
  }

  function handleStarClick(index: number) {
    if (isPlaying) return;

    setStats((prev) => ({ ...prev, totalClicks: prev.totalClicks + 1 }));

    const expected = sequence[userInput.length];
    if (index !== expected) {
      setStats((prev) => ({ ...prev, wrongClicks: prev.wrongClicks + 1 }));
      setWrongIndex(index);
      setShake(true);
      setTimeout(() => {
        setWrongIndex(null);
        setShake(false);
      }, 300);
      return;
    }

    // 정답 클릭
    setUserInput((prev) => [...prev, index]);
    setStats((prev) => ({ ...prev, correctClicks: prev.correctClicks + 1 }));
    setScore((prev) => prev + 1); // 점수 누적
    setPoppedStars((prev) => [...prev, index]);

    // 모든 별 클릭 완료
    if (userInput.length + 1 === sequence.length) {
      const updatedStats = {
        ...stats,
        totalClicks: stats.totalClicks + 1,
        correctClicks: stats.correctClicks + 1,
        successRounds: stats.successRounds + 1,
      };

      setTimeout(() => onRoundComplete(updatedStats), 1000);
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
