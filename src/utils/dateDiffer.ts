import { Dayjs } from 'dayjs';

const dateDiffer = (to: Dayjs, from: Dayjs) => {
  const durationObj = to;
  const remainDays = durationObj.diff(from, 'day'); // x > 0 이어야 남은 날짜수
  const remainHour = durationObj.diff(from.add(remainDays, 'day'), 'h');
  const remainMinute = durationObj.diff(
    from.add(remainDays, 'day').add(remainHour, 'h'),
    'm',
  );

  return { day: remainDays, hour: remainHour, minute: remainMinute };
};

export { dateDiffer };
