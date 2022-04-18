export function getFont(type: string) {
  switch (type) {
    case 'power':
      return 'GangwonEduPower';
    case 'bold':
      return 'GangwonEduAllBold';
    case 'light':
    default:
      return 'GangwonEduAllLight';
  }
};
