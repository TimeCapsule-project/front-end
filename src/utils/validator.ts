import { id } from './regex';

export const validator = (str: string, type: string): boolean => {
  switch (type) {
    case 'id':
      return id.test(str);
    default:
      break;
  }
  return false;
};
