import { ApiResponse, AppError } from '../../types';
import { isAxiosError } from '../type-guards/axios-guard';

export const handleAxiosError = (axiosResponse: ApiResponse<any>) => {
  if (isAxiosError(axiosResponse)) {
    if (axiosResponse.response?.data.error) {
      return axiosResponse.response.data.error;
    } else {
      return { message: axiosResponse.message } as AppError;
    }
  }
  return undefined;
};
