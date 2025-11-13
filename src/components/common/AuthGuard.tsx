'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const publicPaths = ['/signin', '/signup', '/'];

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // 공개 경로는 체크하지 않음
    if (pathname && publicPaths.some((path) => pathname.startsWith(path))) {
      return;
    }

    // 인증 토큰 확인
    const accessToken = window.sessionStorage.getItem('accessToken');

    if (!accessToken) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      router.push('/signin');
    }
  }, [pathname, router]);

  return <>{children}</>;
};

export default AuthGuard;
