import { getParsedDate } from 'utils/getParsedDate';
import { CapsuleType } from './types';

export const writeCapsuleStateDefault = {
  capsuleType: CapsuleType.ANYWHERE,
  capsuleColorIndex: 0,
  content: '',
  date: getParsedDate(new Date()),
  isAllDay: false,
  from: '',
  // to: '', # move to sendNicknameState
};

export const sendNicknameStateDefault = {
  userId: -1,
  nickname: '',
};
