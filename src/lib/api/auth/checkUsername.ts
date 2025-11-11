import apiClient from '@/lib/api/client';

export interface CheckUsernameResponse {
  exists: boolean;
}

export const checkUsername = async (username: string): Promise<CheckUsernameResponse> => {
  const { data } = await apiClient.get<CheckUsernameResponse>('/users/check-username/', {
    params: { username },
  });

  return data;
};
