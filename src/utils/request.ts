import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../../config';
import { getTokenAndType } from './auth';

const instance = axios.create({
  baseURL: API_URL,
});

const get = async <D>(url: string, config?: AxiosRequestConfig<D>) =>
  instance.get(url, {
    ...config,
    headers: { 'X-AUTH-TOKEN': (await getTokenAndType())?.token || '' },
  });

const post = async <D>(url: string, config?: AxiosRequestConfig<D>) =>
  instance.post(url, {
    ...config,
    headers: { 'X-AUTH-TOKEN': (await getTokenAndType())?.token || '' },
  });

export { instance, get, post };
