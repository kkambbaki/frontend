'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PrimaryButton from '../common/PrimaryButton';
import { Input } from '../common/Input';
import Modal from '../common/Modal';

const PasswordBody = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isConfirmDisabled = !password.trim() || password.length < 4;

  const handleConfirm = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    // TODO: 비밀번호 설정 처리 로직 추가
    console.log('Password set:', password);
    router.push('/start');
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="text-[26px] mb-[94px] font-nanum font-extrabold text-[#53514F]">
          아이의 학습 결과를 확인할 수 있는 레포트용 비밀번호를 설정해 주세요.
        </h2>
        <div className="flex justify-center mb-[54px]">
          <Input
            label="비밀번호 4자리 이상"
            variant="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <PrimaryButton
            variant="xs"
            color="orange"
            disabled={isConfirmDisabled}
            onClick={handleConfirm}
          >
            완료
          </PrimaryButton>
        </div>
      </div>
      {isModalOpen && (
        <Modal type="confirm" onConfirm={handleModalConfirm}>
          <div className="flex h-full items-center justify-center">
            <p className="font-malrang text-5xl text-[#68482A]">아이 등록이 완료되었습니다.</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PasswordBody;
