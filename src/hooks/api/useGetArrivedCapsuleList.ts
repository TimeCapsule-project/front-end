import dayjs from 'dayjs';
import Toast from 'react-native-root-toast';
import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { get } from 'utils/request';
import { dateDiffer } from 'utils/dateDiffer';
import { ListViewItem } from 'components/ListView/Item';
import { ArrivedCapsuleItem, GetArrivedCapsuleResponseData } from './types';

const useGetArrivedCapsuleList = (page = 1, onSuccess: (data: any) => void) => {
  const client = useQueryClient();

  const fetch = useCallback(() => get('/api/capsule/main'), []);

  return useQuery<AxiosResponse<GetArrivedCapsuleResponseData>>(
    ['getArrivedCapsuleList', page],
    fetch,
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: response => {
        client.invalidateQueries(['api', 'capsule', 'main']);

        const _datas = response.data.data;
        const _currentObj = dayjs();
        const _mappedListForListView: ListViewItem[] = _datas.map(
          (_data: ArrivedCapsuleItem) => {
            const { day, hour, minute } = dateDiffer(
              dayjs(_data.duration),
              _currentObj,
            );

            const remainTimeText =
              hour < 0 || minute < 0
                ? '지금 오픈 가능합니다!'
                : `${day}일 ${hour}시간 ${minute}분 뒤 오픈 가능`;

            const dDayText = `D-${day > 0 ? day : 'DAY'}`;

            return {
              data: _data,
              id: _data.capsuleId,
              colorIdx: _data.capsuleType,
              mainText: dDayText,
              subText1: remainTimeText,
              subText2: `from. ${_data.nickname}`,
            };
          },
        );

        onSuccess(_mappedListForListView);
      },
      onError: error => {
        Toast.show('도착한 캡슐 목록을 불러오지 못했습니다.');
        console.error(error);
      },
    },
  );
};

export { useGetArrivedCapsuleList };
