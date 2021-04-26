import moment, { Moment } from 'moment';

const getDateFormat = (useDash: boolean) => {
  return useDash ? 'YYYY-MM-DD' : 'YYYY/MM/DD';
};

export const getDatePortionStringOrUndefinedFromMoment = (moment: Moment | undefined, useDash: boolean = false) => {
  if (!moment) {
    return undefined;
  }
  return moment.utc(true).startOf('day').format(getDateFormat(useDash));
};

export const getDateTimeStringOrUndefinedFromMoment = (moment: Moment | undefined, useDash: boolean = false) => {
  if (!moment) {
    return undefined;
  }
  return moment.utc(true).format(`${getDateFormat(useDash)} HH:mm:ss`);
};

export const getTimeStringOrUndefinedFromMoment = (moment: Moment | undefined) => {
  if (!moment) {
    return undefined;
  }
  return moment.utc(true).format('HH:mm');
};

export const getToday = (useDash: boolean = false) => {
  return moment().utc(true).format(getDateFormat(useDash));
};

export const getNowISO = () => {
  return moment().utc(true).toISOString();
};

export const getNow = (locale?: string) => {
  let momentObj = moment();
  if (locale) {
    momentObj = momentObj.locale(locale);
  }
  return momentObj;
};

export const getTomorrow = (locale?: string) => {
  let momentObj = moment().add(1, 'day');
  if (locale) {
    momentObj = momentObj.locale(locale);
  }
  return momentObj;
};

export const momentToISOUtcDate = (date: Moment) => {
  return moment(date).utc(true).startOf('day').toISOString();
};

export const toISOUtcDate = (gregorianDate: string) => {
  return moment(gregorianDate).utc(true).startOf('day').toISOString();
};

export const getDurationAsDays = (dateStart: string, dateEnd: string) => {
  const start = moment(dateStart).utc(true);
  const end = moment(dateEnd).utc(true);
  return end.diff(start, 'days');
};

export const dateStringToMoment = (date: string | undefined, locale?: string) => {
  if (!date) {
    return undefined;
  }
  let momentObj = moment(date);
  if (locale) {
    momentObj = momentObj.locale(locale);
  }
  return momentObj;
};
