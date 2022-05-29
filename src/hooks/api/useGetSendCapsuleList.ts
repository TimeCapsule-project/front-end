import dayjs from 'dayjs';
import Toast from 'react-native-root-toast';
import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { get } from 'utils/request';
import { dateDiffer } from 'utils/dateDiffer';
import { ListViewItem } from 'components/ListView/Item';
import { GetSendCapsuleResponseData, SendCapsuleItem } from './types';

const useGetSendCapsuleList = (page = 1, onSuccess: (data: any) => void) => {
  const client = useQueryClient();

  const fetch = useCallback(() => get('/api/capsule/opening'), []);

  return useQuery<AxiosResponse<GetSendCapsuleResponseData>>(
    ['getSendCapsuleList', page],
    fetch,
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: response => {
        client.invalidateQueries(['api', 'capsule', 'opening']);

        const _datas = response.data.data;
        const _currentObj = dayjs();
        const _mappedListForListView: ListViewItem[] = _datas.map(
          (_data: SendCapsuleItem) => {
            // const { day, hour, minute } = dateDiffer(
            //   dayjs(_data.duration),
            //   _currentObj,
            // );

            // const remainTimeText =
            //   hour < 0 || minute < 0
            //     ? '지금 오픈 가능합니다!'
            //     : `${hour}시간 ${minute}분 뒤 오픈 가능`;

            // console.log(day, hour, minute, remainTimeText);
            // const dDayText = `D-${day > 0 ? day : 'DAY'}`;

            // return {
            //   id: _data.capsuleId,
            //   colorIdx: _data.capsuleType,
            //   mainText: dDayText,
            //   subText1: remainTimeText,
            //   subText2: `from. ${_data.sender}`,
            // };

            // TODO: UPDATE RESPONSE DATA
            return {
              data: _data,
              id: _data.capsuleId,
              colorIdx: 0,
              mainText: 'test',
              subText1: 'testsub',
              subText2: `from. ${'testfrom'}`,
            };
          },
        );

        onSuccess(_mappedListForListView);
      },
      onError: error => {
        Toast.show('내가 보낸 캡슐 목록을 불러오지 못했습니다.');
        console.error(error);
      },
    },
  );
};

export { useGetSendCapsuleList };
