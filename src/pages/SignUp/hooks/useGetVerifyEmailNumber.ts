import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useQuery, useQueryClient } from 'react-query';
import { instance as axios } from 'utils/request';

const useGetVerifyEmailNumber = (
  email: string,
  onSuccess: (data: any) => void,
) => {
  const client = useQueryClient();

  const fetch = useCallback(
    () => axios.get('/api/email', { params: { email } }),
    [email],
  );

  return useQuery(['getVerifyEmailNumber', email], fetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: response => {
      client.invalidateQueries(['api', 'email']);
      onSuccess(response);
    },
    onError: error => {
      Toast.show('이메일 인증번호를 가져오는데 실패했습니다.');
      console.error(error);
    },
  });
};

export { useGetVerifyEmailNumber };
