import { Alert } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export async function requestLocationPermission() {
  const resultRequestAccessCoarseLocation = await request(
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  );
  const resultRequestAccessFineLocation = await request(
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );

  return Promise.all([
    resultRequestAccessCoarseLocation,
    resultRequestAccessFineLocation,
  ])
    .then(res => {
      if (
        res.every(
          status => status === RESULTS.GRANTED || status === RESULTS.LIMITED,
        )
      ) {
        return true;
      }

      Alert.alert(
        '경고!',
        '위치 정보 활성화는 Special Place 캡슐을 묻기 위해 필요합니다!',
      );

      return false;
    })
    .catch(err => console.error(err));
}
