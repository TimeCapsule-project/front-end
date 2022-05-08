import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useQuery, useQueryClient } from 'react-query';
import { instance as axios } from 'utils/request';

const useVerifyEmailNumber = (num: string, onSuccess: (data: any) => void) => {
  const client = useQueryClient();

  const fetch = useCallback(
    () => axios.get('/api/email/verifyCode', { params: { code: num } }),
    [num],
  );

  return useQuery(['verifyEmailNumber', num], fetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: response => {
      client.invalidateQueries(['api', 'email', 'verifyCode']);
      onSuccess(response);
    },
    onError: error => {
      Toast.show('이메일 검증에 실패했습니다.');
      console.error(error);
    },
  });
};

export { useVerifyEmailNumber };
