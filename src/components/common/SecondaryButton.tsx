import React from 'react';
import Image from 'next/image';
import lightbulbFill from '@/assets/icons/lightbulb-fill.svg';
import pack from '@/assets/icons/pack.svg';
import buttonCircle from '@/assets/icons/button-circle-sm.svg';
import { SecondaryButtonProps } from '@/types/common/button';

const SecondaryButton = ({ children, variant, onClick }: SecondaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative font-nanum font-black text-[20px] text-[#714821] bg-[#F1BC4B] rounded-[25px] border-[6px] border-[#C68B0E] pl-[14px] pr-[21px] py-[8px] flex items-center justify-center gap-2"
    >
      <Image
        src={buttonCircle}
        className="absolute left-3 top-1.5"
        alt="button circle"
        width={12.4}
        height={9}
      />
      <span className="relative z-10 flex items-center gap-2">
        {variant === 'focusResult' ? (
          <Image src={pack} alt="pack" width={25.5} height={25.5} />
        ) : (
          <Image src={lightbulbFill} alt="lightbulb fill" width={30.8} height={30.8} />
        )}
        <span className="relative z-10">{children}</span>
      </span>
    </button>
  );
};

export default SecondaryButton;
