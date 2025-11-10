'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '../common/Input';
import BaseButton from '../common/BaseButton';
import Toast from '../common/Toast';

type ToastVariant = 'success' | 'error';

interface StoredToastPayload {
  message: string;
  variant?: ToastVariant;
}

const SigninBody = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<ToastVariant>('success');
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.sessionStorage.getItem('signinToast');

    if (!stored) {
      return;
    }

    try {
      const parsed: StoredToastPayload = JSON.parse(stored);
      setToastMessage(parsed.message);
      setToastVariant(parsed.variant ?? 'success');
      setIsToastOpen(true);
    } catch (error) {
      console.error('저장된 토스트 메시지를 불러오지 못했어요.', error);
    } finally {
      window.sessionStorage.removeItem('signinToast');
    }
  }, []);

  const handleToastClose = () => {
    setIsToastOpen(false);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-[54px] mb-[90px]">
          <Input placeholder="아이디 입력 (영문, 숫자 포함 4자리 이상)" />
          <Input placeholder="비밀번호 입력 (영문, 숫자 포함 8자리 이상)" type="password" />
        </div>
        <BaseButton variant="lg">로그인</BaseButton>
        <a
          href="/signup"
          className="text-center underline font-bold decoration-1 underline-offset-7 text-xl text-[#D3770E] mt-[24px]"
        >
          회원가입
        </a>
      </div>
      <Toast
        message={toastMessage}
        variant={toastVariant}
        isOpen={isToastOpen && !!toastMessage}
        onClose={handleToastClose}
      />
    </>
  );
};

export default SigninBody;
