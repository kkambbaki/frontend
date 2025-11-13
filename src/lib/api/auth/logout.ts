import api from '@/lib/api/client';

export interface LogoutResponse {
  detail: string;
}

export const logout = async (): Promise<LogoutResponse> => {
  const { data } = await api.post<LogoutResponse>('/users/logout/');
  return data;
};
