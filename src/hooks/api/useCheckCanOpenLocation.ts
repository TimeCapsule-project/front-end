import Toast from 'react-native-root-toast';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { get } from 'utils/request';

const useCheckCanOpenLocation = (
  data: {
    capsuleId: number;
    longitude: string;
    latitude: string;
  },
  onSuccess: (canOpenLocation: boolean) => void,
) => {
  const client = useQueryClient();

  const fetch = useCallback(
    () => get('/api/capsule/locationCheck', { data }),
    [data],
  );

  return useQuery(['checkCanOpenLocation', data], fetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: response => {
      client.invalidateQueries(['api', 'user', 'locationCheck']);
      onSuccess(response.data.data);
    },
    onError: error => {
      Toast.show('위치 확인 요청이 실패했습니다.');
      console.error(error);
    },
  });
};

export { useCheckCanOpenLocation };
