import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../../config';
import { getToken } from './auth';

const instance = axios.create({
  baseURL: API_URL,
});

const getHeaders = async () => {
  const token = await getToken();
  const headers: { [x: string]: string } = {};
  if (token) {
    headers['X-AUTH-TOKEN'] = token;
  }

  return headers;
};

const get = async <D>(url: string, config?: AxiosRequestConfig<D>) =>
  instance.get(url, {
    ...config,
    headers: await getHeaders(),
  });

const post = async <D>(url: string, config?: AxiosRequestConfig<D>) =>
  instance.post(url, config?.data, {
    ...config,
    headers: await getHeaders(),
  });

const delete_ = async <D>(url: string, config?: AxiosRequestConfig<D>) =>
  instance.delete(url, {
    ...config,
    headers: await getHeaders(),
  });

export { get, post, delete_ };
