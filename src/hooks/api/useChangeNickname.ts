import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { patch } from 'utils/request';
import { ChangeNicknameResponseData } from './types';
import { USER_PROFILE_KEY } from 'constants/asyncStorage';

const useChangeNickname = (userNickname: string, onSuccess: () => void) => {
  const client = useQueryClient();

  const mutation = useCallback(
    () => patch('/api/user/nickname', { params: { userNickname } }),
    [userNickname],
  );

  return useMutation<AxiosResponse<ChangeNicknameResponseData>>(
    ['changeNickname', userNickname],
    mutation,
    {
      onSuccess: async _ => {
        client.invalidateQueries(['api', 'user', 'nickname']);

        const _userInfo = JSON.parse(
          (await AsyncStorage.getItem(USER_PROFILE_KEY)) || '',
        );
        _userInfo.userNickname = userNickname;
        await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(_userInfo));
        onSuccess();
        Toast.show('유저 닉네임이 변경되었습니다.');
      },
      onError: error => {
        Toast.show('닉네임 변경이 실패했습니다.');
        console.error(error);
      },
    },
  );
};

export { useChangeNickname };
