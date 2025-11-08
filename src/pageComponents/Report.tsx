'use client';

import Logo from '@/components/common/Logo';
import Image from 'next/image';
import React, { useState } from 'react';
import buttonCircleImage from '@/assets/icons/button-circle-yellow2.svg';
import arrowImage from '@/assets/images/arrow.png';
import { Dot } from 'lucide-react';
import SecondaryButton from '@/components/common/SecondaryButton';
import Modal from '@/components/common/Modal';
import { Input } from '@/components/common/Input';
import cancelImage from '@/assets/icons/cancel.svg';
import { useRouter } from 'next/navigation';

type DataRecord = {
  title: string;
  errorRate: number; // 실수율
  reactionTime: number; // 반응속도
  feature1: string; // 특징1
  advice1: string; // 조언1
  feature2: string; // 특징2
  advice2: string; // 조언2
};

const data: DataRecord[] = [
  {
    title: '충동 조절 점수',
    errorRate: 0.12,
    reactionTime: 1.8,
    feature1: '집중력이 높음',
    advice1: '긴 작업 후에는 짧은 휴식을 자주 취하세요.',
    feature2: '세부사항에 강함',
    advice2: '완벽주의로 인해 속도가 느려질 수 있으니 전체 흐름을 의식하세요.',
  },
  {
    title: '주의력 점수',
    errorRate: 0.28,
    reactionTime: 1.2,
    feature1: '빠른 판단력',
    advice1: '속도는 좋지만 정확도 향상에 조금 더 신경 쓰세요.',
    feature2: '스트레스에 민감함',
    advice2: '작은 성공 경험을 쌓으며 자신감을 유지하세요.',
  },
];

const Report = () => {
  const [shareClicked, setShareClicked] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-[calc(100vh-40px)] overflow-y-auto scrollbar px-32 max-md:px-20 py-10">
      <Logo className="absolute top-14 left-8" />
      <Image
        src={cancelImage}
        alt="cancel-button"
        className="absolute top-14 right-8 cursor-pointer hover:scale-105 transition-transform"
        width={60}
        onClick={() => router.push('/main')}
      />

      {/* Title */}
      <div className="flex-grow pt-8 font-extrabold flex flex-col gap-12">
        <div className="flex flex-col items-center gap-8">
          <span className="relative text-[#63411D] px-8 py-2 bg-[#F2B637] rounded-3xl border-[7px] border-[#9A5C1A] text-[26px]">
            <Image
              src={buttonCircleImage}
              alt="icon"
              width={21}
              height={14}
              className="absolute left-2"
            />
            Report
          </span>
          <div className="flex flex-col items-center gap-6">
            <p className="text-[#353535] text-5xl">AI 기반 집중력 분석 레포트</p>
            <p className="text-[#98816B]  text-[26px] text-center">
              게임 결과 데이터를 바탕으로, 아이에게 필요한 집중력 개선 방안을 안내합니다.
            </p>
          </div>
        </div>

        {/* summary */}
        <div className="flex items-center justify-between w-full h-52 bg-[#FFE3A7] rounded-[48px] border-[8px] border-[#DFB458] pl-20 pr-6 mb-10">
          <div className="max-lg:flex-col max-lg:gap-3">
            <div className="flex gap-3 text-[32px]">
              <p>이름</p>
              <p>홍길동</p>
            </div>
            <div className="flex gap-5 text-[28px]">
              <div className="flex gap-3 max-lg:flex-col max-lg:gap-0">
                <p>나이</p>
                <p>12세</p>
              </div>
              <div className="flex gap-3 max-lg:flex-col max-lg:gap-0">
                <p>성별</p>
                <p>남</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around w-3/5 h-36 bg-gradient-to-b from-[#FFF5E3] to-[#FFEED1] rounded-[34px] border-[10px] border-[#DFB458] p-2 max-lg:flex-col">
            <p className="text-4xl max-lg:text-2xl">아이의 집중력 지수</p>
            <p className="text-5xl max-lg:text-3xl">86%</p>
          </div>
        </div>

        {/* 충동 조절 점수 / 주의력 점수 */}
        {data.map((record, index) => (
          <div
            key={index}
            className="relative w-full h-[650px] bg-[#EFB141] border-[6px] border-[#99622D] rounded-[40px] p-4 mt-10"
          >
            {/* title */}
            <div className="w-1/4 h-[88px] absolute bg-[#EEB041] border-[6px] border-[#99622D] rounded-[28px] p-2 -top-10 left-10 z-10">
              <div className="absolute bg-[#F9CC7E] w-8 h-[3px] rounded-full top-[2.5px] left-7"></div>
              <div className="flex items-center justify-center w-full h-full bg-[#9D5C15] border-[3px] border-[#90580A] rounded-[18px]">
                <p className="text-white text-[30px] max-lg:text-2xl text-center">{record.title}</p>
              </div>
            </div>

            <div className="absolute bg-[#F9CC7E] w-1/2 h-1.5 rounded-full top-1 left-1/2 -translate-x-1/2"></div>
            <div className="w-full h-full bg-gradient-to-b from-[#FFF5E3] to-[#FFEED1] rounded-3xl border-[5px] border-[#A66A2F] p-12 font-extrabold flex flex-col justify-around py-16">
              <div className="flex flex-col gap-4">
                <p className="text-[32px]">꼬마 교통 지킴이</p>
                <div className="flex gap-4 text-[26px]">
                  <p>실수율: {(record.errorRate * 100).toFixed(1)}%</p>
                  <p>반응속도: {record.reactionTime}초</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <p className="text-[32px]">AI 기반 분석 및 조언</p>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col text-2xl">
                    <p className="flex items-center">
                      <Dot size={50} />
                      {record.feature1}
                    </p>
                    <div className="flex items-center gap-4 pl-4">
                      <Image src={arrowImage} alt="arrow" width={56} height={56} />
                      <p>{record.advice1}</p>
                    </div>
                  </div>

                  <div className="flex flex-col mt-4 text-2xl">
                    <p className="flex items-center">
                      <Dot size={50} />
                      {record.feature2}
                    </p>
                    <div className="flex items-center gap-4 pl-4">
                      <Image src={arrowImage} alt="arrow" width={56} height={56} />
                      <p>{record.advice2}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <SecondaryButton
            variant="mailShare"
            onClick={() => {
              setShareClicked(true);
            }}
          >
            메일로 공유하기
          </SecondaryButton>
        </div>
      </div>

      {shareClicked && (
        <Modal
          type="step"
          isCloseBtn={true}
          onClose={() => setShareClicked(false)}
          onCancel={() => setShareClicked(false)}
          onNext={() => {
            console.log(email);
          }}
        >
          <div className="flex flex-col items-center gap-6 justify-center h-full py-4">
            <p className="font-malrang text-5xl text-center">
              아이의 집중력 분석 레포트를 메일로 받아보세요.
            </p>
            <div className="flex items-center gap-7 w-full px-5">
              <p className="px-6 py-[19px] bg-modal-inner-input-border text-4xl font-extrabold rounded-[20px] whitespace-nowrap">
                E-MAIL
              </p>
              <Input
                variant="default"
                placeholder="abc@gmail.com"
                className="w-full mx-auto !border-modal-inner-input-border !text-3xl"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Report;
