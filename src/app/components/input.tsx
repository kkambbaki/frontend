'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { DropdownSelect } from '@/components/ui/dropdown-select';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: 'default' | 'birth' | 'text' | 'gender';
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', label, ...props }, ref) => {
    const [gender, setGender] = useState<'male' | 'female' | null>(null);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    // 년 / 월 옵션
    const years = Array.from({ length: 100 }, (_, i) => `${new Date().getFullYear() - i}년`);
    const months = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

    const baseClass =
      'flex font-bold justify-between items-center gap-2 rounded-3xl border-[7px] bg-input-bg border-input-border px-7.5 py-3 transition h-[78px]';

    const renderContent = () => {
      switch (variant) {
        case 'birth':
          return (
            <div className="flex gap-4 ml-auto">
              <DropdownSelect
                label="년"
                options={years}
                value={year}
                onChange={(val: string) => setYear(val)}
                placeholder="년도"
              />
              <DropdownSelect
                label="월"
                options={months}
                value={month}
                onChange={(val: string) => setMonth(val)}
                placeholder="월"
              />
            </div>
          );

        case 'text':
          return (
            <input
              ref={ref}
              {...props}
              className="flex-1 bg-transparent outline-none text-input-text placeholder:text-placeholder-text text-right"
            />
          );

        case 'gender':
          return (
            <div className="flex gap-4 ml-auto text-input-text">
              <div className="flex gap-1.5 items-center">
                <button
                  className={cn(
                    'w-[22px] h-[22px] rounded-full border flex items-center justify-center',
                    gender === 'male' ? 'bg-button-text border-none' : 'border-[#BDBDBD]'
                  )}
                  onClick={() => setGender('male')}
                >
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full bg-input-bg',
                      gender === 'male' ? 'block' : 'hidden'
                    )}
                  />
                </button>
                <p>남자</p>
              </div>
              <div className="flex gap-1.5 items-center">
                <button
                  className={cn(
                    'w-[22px] h-[22px] rounded-full border flex items-center justify-center',
                    gender === 'female' ? 'bg-button-text border-none' : 'border-[#BDBDBD]'
                  )}
                  onClick={() => setGender('female')}
                >
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full bg-input-bg',
                      gender === 'female' ? 'block' : 'hidden'
                    )}
                  />
                </button>
                <p>여자</p>
              </div>
            </div>
          );

        default:
          return (
            <input
              ref={ref}
              {...props}
              className="flex-1 bg-transparent outline-none text-input-text placeholder:text-placeholder-text"
            />
          );
      }
    };

    return (
      <div className="w-full flex flex-col gap-1 text-xl">
        <div className={cn(baseClass, className)}>
          {label && <label className="text-placeholder-text shrink-0">{label}</label>}
          {renderContent()}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
