'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../common/Input';
import BaseButton from '../common/BaseButton';
import Toast from '../common/Toast';
import { signin } from '@/lib/api/auth/signin';
import { PASSWORD_VALIDATION_MESSAGE, USERNAME_VALIDATION_MESSAGE } from '@/lib/constants/auth';

type ToastVariant = 'success' | 'error';

interface StoredToastPayload {
  message: string;
  variant?: ToastVariant;
}

const SigninBody = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isUsernameTouched, setIsUsernameTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [formMessage, setFormMessage] = useState('');
  const [isFormError, setIsFormError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const isUsernameValid = useMemo(() => {
    if (!username) {
      return false;
    }

    const trimmed = username.trim();

    if (trimmed.length < 4) {
      return false;
    }

    const hasLetter = /[A-Za-z]/.test(trimmed);
    const hasNumber = /[0-9]/.test(trimmed);

    return hasLetter && hasNumber;
  }, [username]);

  const isPasswordValid = useMemo(() => {
    if (!password) {
      return false;
    }

    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return password.length >= 8 && hasLetter && hasNumber;
  }, [password]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isUsernameTouched) {
      setIsUsernameTouched(true);
    }
    setUsername(event.target.value);
    setUsernameError('');
    setFormMessage('');
    setIsFormError(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPasswordTouched) {
      setIsPasswordTouched(true);
    }
    setPassword(event.target.value);
    setPasswordError('');
    setFormMessage('');
    setIsFormError(false);
  };

  const handleToastClose = () => {
    setIsToastOpen(false);
  };

  const handleLogin = async () => {
    let hasError = false;

    if (!isUsernameValid) {
      setUsernameError(USERNAME_VALIDATION_MESSAGE);
      hasError = true;
    }

    if (!isPasswordValid) {
      setPasswordError(PASSWORD_VALIDATION_MESSAGE);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsSubmitting(true);
    setFormMessage('');
    setIsFormError(false);

    try {
      const response = await signin({
        username: username.trim(),
        password,
      });

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('accessToken', response.access);
        window.sessionStorage.setItem('refreshToken', response.refresh);
        window.sessionStorage.setItem('currentUser', response.user);
      }

      router.push('/main');
    } catch (error) {
      setFormMessage('아이디 또는 비밀번호가 올바르지 않아요.');
      setIsFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoginDisabled = !isUsernameValid || !isPasswordValid || isSubmitting;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-[54px] mb-[90px]">
          <Input
            placeholder="아이디 입력 (영문, 숫자 포함 4자리 이상)"
            value={username}
            onChange={handleUsernameChange}
            error={!!usernameError}
            errorText={usernameError}
            helperText={
              !usernameError && isUsernameTouched ? '아이디는 대소문자를 구분해요.' : undefined
            }
          />
          <Input
            placeholder="비밀번호 입력 (영문, 숫자 포함 8자리 이상)"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            errorText={passwordError}
          />
        </div>
        <BaseButton variant="lg" disabled={isLoginDisabled} onClick={handleLogin}>
          {isSubmitting ? '로그인 중' : '로그인'}
        </BaseButton>
        <div className="mt-4 min-h-[32px] text-center text-xl font-bold">
          {formMessage ? (
            <span className={isFormError ? 'text-[#CE2D2D]' : 'text-[#3D7F0B]'}>{formMessage}</span>
          ) : (
            <span className="text-transparent">placeholder</span>
          )}
        </div>
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
