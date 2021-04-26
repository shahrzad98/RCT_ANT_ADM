import { AxiosError, AxiosResponse } from 'axios';

export const isAxiosError = (response: AxiosResponse | AxiosError): response is AxiosError => {
  return (response as AxiosError).isAxiosError;
};
