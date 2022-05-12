import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useQuery, useQueryClient } from 'react-query';
import { get } from 'utils/request';

const useRandomNickname = (onSuccess: (data: string) => void) => {
  const client = useQueryClient();

  const fetch = useCallback(() => get('/api/capsule/nickname'), []);

  return useQuery(['getRandomNickname'], fetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: response => {
      client.invalidateQueries(['api', 'capsule', 'nickname']);
      onSuccess(response.data.data);
    },
    onError: error => {
      Toast.show('랜덤 닉네임 생성에 실패했습니다.');
      console.error(error);
    },
  });
};

export { useRandomNickname };
