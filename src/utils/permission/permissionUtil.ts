import { checkLocationPermission } from './checkPermissions';
import { requestLocationPermission } from './requestPermissions';

export const setLocationPermission = async (callback: () => void) => {
  if (await checkLocationPermission()) {
    return callback();
  }
  if (await requestLocationPermission()) {
    return callback();
  }
};
