import React from 'react';
import { Input } from '../common/Input';
import BaseButton from '../common/BaseButton';

const SignupBody = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-[54px] mb-[90px]">
        <div className="flex items-center gap-6">
          <Input placeholder="아이디 입력 (영문, 숫자 포함 4자리 이상)" />
          <button className="cursor-pointer font-extrabold px-[24.5px] py-[26px] bg-[#E7E1D7] rounded-[24px] text-xl text-[#BAAB96] whitespace-nowrap">
            중복확인
          </button>
        </div>
        <Input placeholder="비밀번호 입력 (영문, 숫자 포함 8자리 이상)" type="password" />
      </div>
      <BaseButton variant="lg">회원가입</BaseButton>
      <a
        href="/signin"
        className="text-center underline font-bold decoration-1 underline-offset-7 text-xl text-[#D3770E] mt-[24px]"
      >
        이미 계정이 있으신가요?
      </a>
    </div>
  );
};

export default SignupBody;
