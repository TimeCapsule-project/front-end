import dayjs from 'dayjs';
import Toast from 'react-native-root-toast';
import { useMutation, useQueryClient } from 'react-query';
import { CapsuleType } from 'states/types';
import { post } from 'utils/request';

interface WriteCapsuleData {
  type: CapsuleType; //         캡슐 타입 # Front-end using only, not send to server
  capsuleColorIndex: number; // 캡슐 디자인 번호 # server - capsuleType
  content: string; //           내용
  nickname: string; //          내 닉네임
  recipient: number; //         캡슐 받을 친구 # userId
  duration: string; //          개봉 날짜 # format - 2022-04-05T11:59:59
  latitude?: number; //         위도 # special type only
  longitude?: number; //        경도 # special type only
}

const useWriteCapsuleMutation = (onSuccess: (data: any) => void) => {
  const client = useQueryClient();

  return useMutation(
    'writeCapsule',
    (data: WriteCapsuleData) => {
      const requestData = {
        content: data.content,
        nickname: data.nickname,
        recipient: data.recipient,
        capsuleType: data.capsuleColorIndex,
        duration: data.duration,
      };

      if (data.type === 'special') {
        Object.assign(requestData, {
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }

      return post(`/api/capsule/${data.type}`, { data: requestData });
    },
    {
      onSuccess: (reaponse: any) => {
        const data = reaponse.data.data;
        client.invalidateQueries(['api', 'capsule']);
        Toast.show('캡슐을 성공적으로 묻었습니다!', {
          duration: Toast.durations.SHORT,
          onHidden: () =>
            Toast.show(
              `개봉 가능한 시기는 ${dayjs(data.duration).format(
                'YYYY.MM.DD HH:mm:ss',
              )} 입니다!`,
              {
                duration: Toast.durations.SHORT,
              },
            ),
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
