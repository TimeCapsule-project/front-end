import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useQuery, useQueryClient } from 'react-query';
import { get } from 'utils/request';

const useCheckDuplicateId = (
  userId: string,
  onSuccess: (data: any) => void,
) => {
  const client = useQueryClient();

  const fetch = useCallback(
    () => get('/api/user/userIdCheck', { params: { userId } }),
    [userId],
  );

  return useQuery(['checkDuplicateId', userId], fetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: response => {
      client.invalidateQueries(['api', 'user', 'userIdCheck']);
      Toast.show('회원가입이 가능한 아이디 입니다!');
      onSuccess(response);
    },
    onError: error => {
      Toast.show('이미 가입된 아이디 입니다.');
      console.error(error);
    },
  });
};

export { useCheckDuplicateId };
