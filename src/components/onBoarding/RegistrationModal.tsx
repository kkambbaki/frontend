'use client';

import React from 'react';
import Image from 'next/image';
import PrimaryButton from '../common/PrimaryButton';
import registrationModalImage from '@/assets/images/registeration-modal.png';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="relative mx-5">
        <Image
          src={registrationModalImage}
          alt="registration modal"
          width={761}
          height={388}
          unoptimized
        />
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
          <PrimaryButton variant="md" color="green" onClick={onConfirm}>
            확인
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
