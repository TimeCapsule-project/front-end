import { useCallback } from 'react';
import Toast from 'react-native-root-toast';
import { useMutation, useQueryClient } from 'react-query';
import { delete_ } from 'utils/request';

const useRemoveAccount = (onSuccess: (data: any) => void) => {
  const client = useQueryClient();

  const mutation = useCallback(
    (id: number) => delete_(`/api/user/delete/${id}`),
    [],
  );

  return useMutation('deleteAccount', mutation, {
    onSuccess: response => {
      client.invalidateQueries(['api', 'user', 'delete']);
      onSuccess(response);
    },
    onError: error => {
      Toast.show('계정 삭제에 실패했습니다.');
      console.error(error);
    },
  });
};

export { useRemoveAccount };
