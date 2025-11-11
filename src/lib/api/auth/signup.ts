import apiClient from '@/lib/api/client';

export interface RegisterRequest {
  username: string;
  password1: string;
  password2: string;
  email?: string;
}

export interface RegisterResponse {
  username: string;
}

export const signup = async (payload: RegisterRequest): Promise<RegisterResponse> => {
  const { data } = await apiClient.post<RegisterResponse>('/users/registration/', payload);

  return data;
};
