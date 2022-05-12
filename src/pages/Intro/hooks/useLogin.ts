import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useQuery, useQueryClient } from 'react-query';
import { get } from 'utils/request';

type LoginData = { userId: string; userPw: string };

const useLogin = (data: LoginData, onSuccess: (data: any) => void) => {
  const client = useQueryClient();

  const fetch = useCallback(() => get('/api/user/login', { data }), [data]);

  return useQuery(['login', data], fetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: response => {
      client.invalidateQueries(['api', 'user', 'login']);
      onSuccess(response);
    },
    onError: error => {
      Toast.show('로그인이 실패했습니다.');
      console.error(error);
    },
  });
};

export { useLogin };
