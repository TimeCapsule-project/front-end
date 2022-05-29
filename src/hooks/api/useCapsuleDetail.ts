import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useQuery, useQueryClient } from 'react-query';
import { get } from 'utils/request';

const useCapsuleDetail = (id: number, onSuccess: (data: any) => void) => {
  const client = useQueryClient();

  const fetch = useCallback(() => get(`/api/capsule/detail/${id}`), [id]);

  return useQuery(['getCapsuleDetail', id], fetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: response => {
      client.invalidateQueries(['api', 'capsule', 'detail']);
      onSuccess(response.data.data);
    },
    onError: error => {
      Toast.show('캡슐 정보를 가져오지 못했습니다.');
      console.error(error);
    },
  });
};

export { useCapsuleDetail };
