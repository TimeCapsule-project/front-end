import { atom } from 'recoil';
import { writeCapsuleStateDefault, sendNicknameStateDefault } from './default';
import { CapsuleStateData, LatLngDefaultData } from './types';

export const writeCapsuleState = atom<CapsuleStateData>({
  key: 'writeCapsuleState',
  default: writeCapsuleStateDefault,
});

export const sendNicknameState = atom({
  key: 'sendNicknameState',
  default: sendNicknameStateDefault,
});

export const latLngState = atom<LatLngDefaultData>({
  key: 'latLngState',
  default: {
    lat: 0,
    lng: 0,
  },
});
