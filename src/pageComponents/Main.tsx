'use client';

import Logo from '@/components/common/Logo';
import React, { useState } from 'react';
import star from '@/assets/images/main-star.png';
import traffic from '@/assets/images/main-traffic.png';
import Image from 'next/image';
import PrimaryButton from '@/components/common/PrimaryButton';
import Modal from '@/components/common/Modal';
import ModalTitle from '@/components/common/ModalTitle';
import { Input } from '@/components/common/Input';
import SecondaryButton from '@/components/common/SecondaryButton';

const Main = () => {
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [isEffectModalOpen, setIsEffectModalOpen] = useState(false);
  const [isFirst] = useState(false); // TODO: 게임 플레이 여부 수정 필요

  const closePwModal = () => setIsPwModalOpen(false);
  const closeEffectModal = () => setIsEffectModalOpen(false);

  return (
    <div className="flex flex-col min-h-[calc(100vh-40px)]">
      <Logo className="absolute top-14 left-8" />
      <div className="flex-grow px-20 pt-10 items-center flex gap-20 justify-center max-md:flex-col max-md:pt-32 max-md:pb-10 max-md:gap-10">
        <div className="flex flex-col items-center gap-5">
          <Image
            src={star}
            alt="Star"
            width={436}
            height={340}
            className="border-[18px] border-background-header rounded-[75px] hover:scale-105 transition-transform"
          />
          <PrimaryButton onClick={() => console.log('clicked')}>시작하기</PrimaryButton>
        </div>
        <div className="flex flex-col items-center gap-5">
          <Image
            src={traffic}
            alt="Traffic"
            width={436}
            height={340}
            className="border-[18px] border-background-header rounded-[75px] hover:scale-105 transition-transform"
          />
          <PrimaryButton onClick={() => console.log('clicked')}>시작하기</PrimaryButton>
        </div>
      </div>
      <footer className="relative h-[108px] w-full bg-background-header flex justify-end items-center px-5 md:px-10">
        <div className="max-md:hidden">
          <div className="absolute bg-main-footer-glow w-[200px] h-1.5 rounded-full bottom-20 left-0"></div>
          <div className="absolute bg-main-footer-glow w-[140px] h-1.5 rounded-full bottom-16 left-10"></div>
          <div className="absolute bg-main-footer-glow w-[250px] h-1.5 rounded-full bottom-2 left-50"></div>
          <div className="absolute bg-main-footer-glow w-[205px] h-1.5 rounded-full bottom-10 left-120"></div>
          <div className="absolute bg-main-footer-glow w-[120px] h-1.5 rounded-full bottom-14 left-120"></div>
          <div className="absolute bg-main-footer-glow w-[100px] h-1.5 rounded-full bottom-3 right-0"></div>
          <div className="absolute bg-main-footer-glow w-[200px] h-1.5 rounded-full bottom-6 right-0"></div>
          <div className="absolute bg-main-footer-glow w-[200px] h-1.5 rounded-full bottom-20 right-10"></div>
        </div>

        <div className="flex gap-3">
          <SecondaryButton
            variant="focusResult"
            onClick={() => {
              setIsPwModalOpen(true);
            }}
          >
            집중력 학습 결과
          </SecondaryButton>
          <SecondaryButton
            variant="learningEffect"
            onClick={() => {
              setIsEffectModalOpen(true);
            }}
          >
            교육적 효과
          </SecondaryButton>
        </div>
      </footer>

      {isPwModalOpen &&
        (isFirst ? (
          <Modal type="confirm" isCloseBtn={true} onConfirm={closePwModal} onClose={closePwModal}>
            <div className="flex items-center justify-center h-full">
              <p className="font-malrang text-5xl text-center">
                각 게임을 1번 이상 플레이 해주세요!
              </p>
            </div>
          </Modal>
        ) : (
          <Modal type="confirm" isCloseBtn={true} onConfirm={closePwModal} onClose={closePwModal}>
            <div className="flex flex-col items-center justify-center gap-5 h-[250px]">
              <p className="font-malrang text-5xl">비밀번호를 입력해주세요.</p>
              <p className="text-2xl font-extrabold text-modal-inner-text">
                레포트는 각 게임을 1번 이상 플레이 시, 생성됩니다.
              </p>
              <Input
                variant="password"
                placeholder="비밀번호 입력"
                className="w-full mx-auto !border-modal-inner-input-border"
              />
            </div>
          </Modal>
        ))}

      {isEffectModalOpen && (
        <Modal
          size="large"
          type="confirm"
          isCloseBtn={true}
          onConfirm={closeEffectModal}
          onClose={closeEffectModal}
        >
          <div className="flex flex-col items-start gap-5 h-[350px] overflow-y-auto scroll-bar">
            <div className="flex flex-col gap-5">
              <ModalTitle>뿅뿅 아기별</ModalTitle>
              <ul className="list-disc list-inside px-2 text-2xl font-extrabold space-y-3">
                <li>
                  이 게임은 정보를 잠시 동안 머릿속에 유지하고 조작하는 능력, 즉 작업 기억력을
                  직접적으로 훈련합니다.
                </li>
                <li>
                  작업 기억력은 학습 능력과 주의력 유지의 근간이 되는 핵심 인지 기능입니다. 순서
                  기억 훈련과 유사한 N-back 훈련을 포함한 작업 기억 훈련 프로그램이 아동의 유동
                  지능(Fluid Intelligence)과 주의력 통제 능력(Attention Control)을 향상시킨다는
                  연구가 다수 발표되었습니다. (Jaeggi et al., 2008)
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <ModalTitle>꼬마 교통 지킴이</ModalTitle>
              <ul className="list-disc list-inside pl-2 text-2xl font-extrabold space-y-3">
                <li>
                  &lsquo;꼬마 신호등 지킴이&rsquo;의 핵심은 &lsquo;빨간불&rsquo;이 들어왔을 때, 이미
                  자동적으로 형성된 &lsquo;움직이려는 반응(Go)&rsquo;을 의도적으로 억제하는 능력을
                  훈련하는 것입니다.
                </li>
                <li>
                  Go/No-Go 과제는 인지 심리학 및 신경 과학 분야에서 충동성과 반응 억제 조절을
                  측정하는 표준 방법으로 널리 사용됩니다. ADHD 경향성이 있는 아동을 대상으로 한
                  연구들에서는 반응 억제 조절이 어려운 집단에서 No-Go 과제 수행 시 특정 뇌파(Nogo P3
                  사건유발전위)의 진폭이 감소하는 등, 충동성이 No-Go 실수율과 밀접하게 연관된다는
                  결과가 보고되었습니다. Bohne et al., 2008; 선행 연구 메타분석 인용)
                </li>
                <li>
                  따라서 이 게임은 아동의 충동적인 행동 경향을 정량적인 실수율 데이터(빨간불 터치
                  횟수)로 측정하고, 지속적인 훈련을 통해 실생활에서의 자기 통제력을 간접적으로
                  향상시키는 데 효과를 기대할 수 있습니다.
                </li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Main;
