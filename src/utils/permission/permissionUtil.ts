import { checkLocationPermission } from './checkPermissions';
import { requestLocationPermission } from './requestPermissions';

export const activeLocationPermission = async (callback: () => void) => {
  if (await checkLocationPermission()) {
    return callback();
  }
  if (await requestLocationPermission()) {
    return callback();
  }
};
