import axios, { AxiosHeaders } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  console.error('NEXT_PUBLIC_API_BASE_URL 환경 변수가 설정되지 않았습니다.');
}

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  // 로그인/회원가입 엔드포인트는 토큰이 필요 없음
  const url = config.url ?? '';
  const isAuthEndpoint = url.includes('/login/') || url.includes('/registration/');

  if (typeof window !== 'undefined' && !isAuthEndpoint) {
    const accessToken = window.sessionStorage.getItem('accessToken');
    if (accessToken) {
      const headers = config.headers ?? new AxiosHeaders();

      if (headers instanceof AxiosHeaders) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      } else {
        (headers as Record<string, unknown>)['Authorization'] = `Bearer ${accessToken}`;
      }

      config.headers = headers;
    }
  }
  return config;
});

export default apiClient;
