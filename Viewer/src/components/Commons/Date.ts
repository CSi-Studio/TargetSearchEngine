import dayjs from 'dayjs';

export function format(datatime: string) {
  return dayjs(datatime).format('YYYY-MM-DD HH:mm:ss');
}

export function formatNoYear(datatime: string) {
  return dayjs(datatime).format('MM-DD HH:mm:ss');
}
