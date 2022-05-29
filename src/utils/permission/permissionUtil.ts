import { checkLocationPermission } from './checkPermissions';
import { requestLocationPermission } from './requestPermissions';

export const activeLocationPermission = async () => {
  if (await checkLocationPermission()) {
    return true;
  }
  if (await requestLocationPermission()) {
    return true;
  }
  return false;
};
