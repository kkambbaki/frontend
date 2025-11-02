import Image from 'next/image';
import React from 'react';
import character from '@/assets/images/character.png';

const Header = ({ topBgColor }: { topBgColor: boolean }) => {
  return (
    <header className="flex flex-col items-center w-full">
      {topBgColor && <div className="w-full h-[40px] bg-[#FFE3A7]"></div>}
      <div className="flex items-center justify-center mt-[70px] mb-[70px] gap-4">
        <h1 className="text-[85.3px] font-malrang">깜빡이</h1>
        <Image src={character} alt="character" width={83} height={70} />
      </div>
    </header>
  );
};

export default Header;
