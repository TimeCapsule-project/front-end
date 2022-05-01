import { Alert } from 'react-native';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';

export async function checkLocationPermission(activeAlert = false) {
  const canAccessCoarseLocation = await check(
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  );
  const canAccessFineLocation = await check(
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );

  return Promise.all([canAccessCoarseLocation, canAccessFineLocation]).then(
    res => {
      if (
        res.every(
          status => status === RESULTS.GRANTED || status === RESULTS.LIMITED,
        )
      ) {
        return true;
      }

      if (activeAlert) {
        Alert.alert(
          '경고!',
          '위치 정보가 활성화 되어 있지 않아, Special Place 캡슐을 묻을 수 없어요!',
        );
      }

      return false;
    },
  );
}
