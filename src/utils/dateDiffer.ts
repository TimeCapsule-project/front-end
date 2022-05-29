import { Dayjs } from 'dayjs';

const dateDiffer = (from: Dayjs, to: Dayjs) => {
  const durationObj = from;
  const remainDays = durationObj.diff(to, 'day');
  console.log("TEST", durationObj.add(remainDays, 'day'));
  const remainHour = durationObj.add(remainDays, 'day').diff(to, 'h');
  console.log("TEST2", durationObj
  .add(remainDays, 'day')
  .add(remainHour, 'h'))
  const remainMinute = durationObj
    .add(remainDays, 'day')
    .add(remainHour, 'h')
    .diff(to, 'm');

  return { day: remainDays, hour: remainHour, minute: remainMinute };
};

export { dateDiffer };
