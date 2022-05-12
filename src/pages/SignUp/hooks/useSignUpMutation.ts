import Toast from 'react-native-root-toast';
import { useMutation, useQueryClient } from 'react-query';
import { post } from 'utils/request';

interface SignUpData {
  userId: string;
  userPw: string;
  userNickname: string;
  userEmail: string;
}

const useSignUpMutation = (onSuccess: () => void) => {
  const client = useQueryClient();

  return useMutation(
    'signUp',
    (data: SignUpData) => post('/api/user', { data }),
    {
      onSuccess: () => {
        client.invalidateQueries(['api', 'user']);
        Toast.show('회원가입에 성공했습니다!');
        onSuccess();
      },
      onError: (error: any) => {
        Toast.show('가입에 실패했습니다.');
        console.error(error);
      },
    },
  );
};

export { useSignUpMutation };
