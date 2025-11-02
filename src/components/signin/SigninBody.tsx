import React from 'react';
import { Input } from '../common/Input';
import BaseButton from '../common/BaseButton';

const SigninBody = () => {
  return (
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
  );
};

export default SigninBody;
