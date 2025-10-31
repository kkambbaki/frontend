'use client';

import RegisteratonBody from '@/components/onBoarding/RegisteratonBody';
import RegisteratonHeader from '@/components/onBoarding/RegisteratonHeader';
import PasswordBody from '@/components/onBoarding/PasswordBody';
import React, { useState } from 'react';

type Step = 'registration' | 'password';

const OnBoarding = () => {
  const [step, setStep] = useState<Step>('registration');

  return (
    <div className="flex flex-col items-center">
      <RegisteratonHeader />
      {step === 'registration' ? (
        <RegisteratonBody onNext={() => setStep('password')} />
      ) : (
        <PasswordBody />
      )}
    </div>
  );
};

export default OnBoarding;
