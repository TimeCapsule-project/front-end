import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useQuery, useQueryClient } from 'react-query';
import { patch } from 'utils/request';

const useToggleAllowSearchNickname = (onSuccess: (data: string) => void) => {
  const client = useQueryClient();

  // TODO: response 가 성공했다고만 나오고 상태를 전달해 주지않음
  const fetch = useCallback(() => patch('/api/search/enabled'), []);

  return useQuery(['toggleAllowSearchNickname'], fetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: response => {
      client.invalidateQueries(['api', 'search', 'enabled']);
      console.log(response.data);
      onSuccess(response.data);
    },
    onError: error => {
      Toast.show('닉네임 검색 허용이 실패했습니다.');
      console.error(error);
    },
  });
};

export { useToggleAllowSearchNickname };
