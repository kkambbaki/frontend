'use client';
import React from 'react';
import PrimaryButton from './PrimaryButton';
import { cn } from '@/lib/utils';
import close from '@/assets/icons/cancel.svg';
import Image from 'next/image';

const Modal = ({
  children,
  type = 'step',
  isClose = false,
  size = 'default',
}: {
  children?: React.ReactNode;
  type?: 'confirm' | 'step';
  isClose?: boolean;
  size?: 'default' | 'large';
}) => {
  const widthClass = size === 'large' ? 'max-w-[900px]' : 'max-w-[800px]';

  return (
    <div
      className={cn(
        'relative flex flex-col items-center w-full min-w-[300px] bg-modal-bg rounded-[50px] border-modal-border border-[12px] p-4',
        widthClass
      )}
    >
      <div className="relative w-full min-h-[250px] h-auto bg-gradient-to-b from-modal-inner-top-bg to-modal-inner-bottom-bg border-8 border-modal-inner-border rounded-[27px] flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bg-modal-inner-glow w-[100px] h-1.5 rounded-r-full top-10 left-0"></div>
          <div className="absolute bg-modal-inner-glow w-[60px] h-1.5 rounded-r-full top-13 left-0"></div>

          <div className="absolute bg-modal-inner-glow w-[100px] h-1.5 rounded-full left-60 bottom-10"></div>
          <div className="absolute bg-modal-inner-glow w-[80px] h-1.5 rounded-full left-56 bottom-7"></div>

          <div className="absolute bg-modal-inner-glow w-[80px] h-1.5 rounded-full right-28 top-10"></div>
          <div className="absolute bg-modal-inner-glow w-[60px] h-1.5 rounded-full right-36 top-7"></div>

          <div className="absolute bg-modal-inner-glow w-[60px] h-1.5 rounded-l-full right-0 bottom-20"></div>
          <div className="absolute bg-modal-inner-glow w-[100px] h-1.5 rounded-l-full right-0 bottom-16"></div>
        </div>

        <div className="relative z-10 w-full flex flex-col items-center gap-4">{children}</div>
      </div>

      {/* 닫기 버튼 */}
      {isClose && (
        <Image
          src={close}
          alt="Close"
          className="absolute -top-9 -right-8 cursor-pointer w-16 sm:w-20 hover:w-[68px] sm:hover:w-[84px] transition-all"
          onClick={() => console.log('close clicked')}
        />
      )}

      {/* 버튼 */}
      <div className="mt-4 flex gap-4 sm:gap-6 z-20">
        {type === 'confirm' ? (
          <PrimaryButton onClick={() => console.log('확인 클릭')} variant="sm" color="green">
            확인
          </PrimaryButton>
        ) : (
          <>
            <PrimaryButton onClick={() => console.log('취소 클릭')} variant="sm" color="red">
              취소
            </PrimaryButton>
            <PrimaryButton onClick={() => console.log('다음 클릭')} variant="sm" color="green">
              다음
            </PrimaryButton>
          </>
        )}
      </div>

      {/* bottom glow */}
      <div
        className={cn(
          'absolute bg-modal-glow h-1.5 rounded-full bottom-[110px] left-7',
          type === 'confirm' ? 'w-[250px]' : 'w-[150px]'
        )}
      ></div>

      {/* top glow */}
      <div className="absolute bg-modal-glow w-[50px] h-1.5 rounded-full top-1.5 left-10"></div>
      <div className="absolute bg-modal-glow w-[10px] h-1.5 rounded-full top-1.5 left-7"></div>
    </div>
  );
};

export default Modal;
