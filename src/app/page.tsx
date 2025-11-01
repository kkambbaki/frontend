import BaseButton from '@/components/common/BaseButton';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <header className="h-10 w-full bg-background-header" />

      <div className="flex flex-col items-center justify-center flex-1 gap-[117px]">
        <div className="flex flex-col items-center">
          <div className="flex flex-col-reverse items-center md:gap-6 md:flex-row md:justify-center">
            <p className="text-[100px] md:text-[140px] font-malrang">깜빡이</p>
            <Image src="/bulb.png" alt="character" width={100} height={100} />
          </div>

          <p className="text-[32px] max-md:text-[25px] font-malrang">보호자와 함께 플레이하세요!</p>
        </div>

        <BaseButton variant="md">시작하기</BaseButton>
      </div>
    </main>
  );
}
