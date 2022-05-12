import Toast from 'react-native-root-toast';
import { useMutation, useQueryClient } from 'react-query';
import { post } from 'utils/request';

interface WriteCapsuleData {
  title: string;
  content: string;
  nickname: string; // 내 닉네임
  recipient: string; // 캡슐 받을 친구
  duration: string; // 2022-04-05
  latitude: number; // 위도
  longitude: number; // 경도
}

const useWriteCapsuleMutation = (onSuccess: (data: any) => void) => {
  const client = useQueryClient();

  return useMutation(
    'writeCapsule',
    (data: WriteCapsuleData) => post('/api/capsule', { data }),
    {
      onSuccess: (reaponse: any) => {
        const data = reaponse.data.data;
        client.invalidateQueries(['api', 'capsule']);
        Toast.show('캡슐을 성공적으로 묻었습니다!', {
          duration: Toast.durations.SHORT,
          onHidden: () =>
            Toast.show(`개봉 가능한 시기는 ${data.duration} 입니다!`, {
              duration: Toast.durations.SHORT,
            }),
        });
        onSuccess(data);
      },
      onError: (error: any) => {
        Toast.show('캡슐을 묻는데 실패했습니다.');
        console.error(error);
      },
    },
  );
};

export { useWriteCapsuleMutation };
