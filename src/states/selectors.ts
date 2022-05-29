import { selector } from 'recoil';
import { writeCapsuleState, latLngState, sendNicknameState } from './atoms';

export const writeCapsuleSelector = selector({
  key: 'writeCapsuleSelector',
  get: ({ get }) => get(writeCapsuleState),
});

export const sendNicknameSelector = selector({
  key: 'sendNicknameSelector',
  get: ({ get }) => get(sendNicknameState),
});

export const latLngSelector = selector({
  key: 'latLngSelector',
  get: ({ get }) => get(latLngState),
});
