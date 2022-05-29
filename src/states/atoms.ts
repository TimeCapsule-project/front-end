import { atom } from 'recoil';
import { writeCapsuleStateDefault, sendNicknameStateDefault } from './default';
import { CapsuleStateData } from './types';

export const writeCapsuleState = atom<CapsuleStateData>({
  key: 'writeCapsuleState',
  default: writeCapsuleStateDefault,
});

export const sendNicknameState = atom({
  key: 'sendNicknameState',
  default: sendNicknameStateDefault,
});

export const latLngState = atom({
  key: 'latLngState',
  default: {
    lat: 0,
    lng: 0,
  },
});
