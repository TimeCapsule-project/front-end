import dayjs from 'dayjs';

export const getParsedDate = (value?: Date) => {
  const _date = dayjs(value || undefined);
  return {
    date: _date.format('YYYY.MM.DD'),
    time: _date.format('A HH:mm'),
  };
};
