import { selector } from 'recoil';
import { latLngState } from './atoms';

export const latLngSelector = selector({
  key: 'latLngSelector',
  get: ({ get }) => get(latLngState),
});
