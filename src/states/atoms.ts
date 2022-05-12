import { atom } from 'recoil';

export const latLngState = atom({
  key: 'latLngState',
  default: {
    lat: 0,
    lng: 0,
  },
});
