import Image from 'next/image';
import React from 'react';
import logoImage from '@/assets/images/bulb.png';

const Logo = () => {
  return (
    <div className="flex items-center gap-2 absolute top-14 left-8">
      <p className="font-malrang text-5xl">깜빡이</p>
      <Image src={logoImage} alt="Logo" width={44} height={40} />
    </div>
  );
};

export default Logo;
