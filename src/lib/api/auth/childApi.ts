import { api } from '../apiClient';

export interface CreateChildRequest {
  name: string;
  birthYear: number;
  gender: 'M' | 'F'; // M: 남자, F: 여자
}

export interface CreateChildResponse {
  id: number;
  name: string;
  birthYear: number;
  gender: 'M' | 'F';
}

// 자녀 등록 API
export const createChildUser = async (data: CreateChildRequest): Promise<CreateChildResponse> => {
  const res = await api.post<CreateChildResponse>('/users/child/', data);
  return res.data;
};
