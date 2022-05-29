import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from 'axios';
import { USER_PROFILE_KEY } from 'constants/asyncStorage';
import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useQuery, useQueryClient } from 'react-query';
import { get } from 'utils/request';

export type NicknameItem = { id: number; userNickname: string };

type SearchNicknameResponseData = {
  data: NicknameItem[];
};

export type SuccessSearchNicknameParams = SearchNicknameResponseData['data'];

const useSearchNickname = (
  nickname: string,
  onSuccess: (data: any) => void,
) => {
  const client = useQueryClient();

  const fetch = useCallback(
    () => get('/api/search', { params: { keyword: nickname } }),
    [nickname],
  );

  return useQuery<AxiosResponse<SearchNicknameResponseData>>(
    ['searchNickname', nickname],
    fetch,
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: async response => {
        client.invalidateQueries(['api', 'search']);
        const _data = response.data.data;
        const _parseUserInfo = JSON.parse(
          (await AsyncStorage.getItem(USER_PROFILE_KEY)) || '',
        );

        const userId = _parseUserInfo.userId;
        onSuccess(_data.filter(data => data.id !== userId));
      },
      onError: error => {
        Toast.show('닉네임 검색이 실패했습니다.');
        console.error(error);
      },
    },
  );
};

export { useSearchNickname };
