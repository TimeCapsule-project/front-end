import { useMutation, useQueryClient } from 'react-query';
import { instance as axios } from 'utils/request';

interface SignUpParams {
  userId: string;
  userPw: string;
  userNickname: string;
  userEmail: string;
}

const useSignUpMutation = (onSuccess: () => void) => {
  const client = useQueryClient();

  return useMutation(
    'signUp',
    (params: SignUpParams) => axios.post('/api/user', params),
    {
      onSuccess: () => {
        client.invalidateQueries(['api', 'user']);
        onSuccess();
      },
    },
  );
};

export { useSignUpMutation };
