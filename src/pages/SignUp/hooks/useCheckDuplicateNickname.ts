import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useQuery, useQueryClient } from 'react-query';
import { get } from 'utils/request';

const useCheckDuplicateNickname = (
  userNickname: string,
  onSuccess: (data: any) => void,
) => {
  const client = useQueryClient();

  const fetch = useCallback(
    () => get('/api/user/userNicknameCheck', { params: { userNickname } }),
    [userNickname],
  );

  return useQuery(['checkDuplicateNickname', userNickname], fetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: response => {
      client.invalidateQueries(['api', 'user', 'userNicknameCheck']);
      Toast.show('가입가능한 닉네임 입니다!');
      onSuccess(response);
    },
    onError: error => {
      Toast.show('중복된 닉네임 입니다.');
      console.error(error);
    },
  });
};

export { useCheckDuplicateNickname };
