import { Input } from '@/components/common/input';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <header className="h-10 w-full bg-background-header" />

      {/* 콘텐츠 영역 */}
      <div className="flex flex-col items-center justify-center flex-1 gap-32 font-malrang">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-6">
            <p className="text-[140px]">깜빡이</p>
            <Image src="/character.png" alt="character" width={100} height={100} />
          </div>

          <p className="text-[32px]">보호자와 함께 플레이하세요!</p>
        </div>

        {/* Button 자리 */}
        <p className="w-[280px] h-[100px] bg-amber-500 text-[46px] flex justify-center items-center">
          시작하기
        </p>
      </div>
    </main>
  );
}
