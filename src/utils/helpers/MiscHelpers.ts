import scrollTo from 'antd/es/_util/scrollTo';
import floor from 'lodash/floor';
import moment from 'moment';
import React from 'react';

import { LocalStorageKey } from '../../features/constants';
import { SortOrder } from '../../types';
import { getNowISO } from './DateHelpers';
import { addOrSetArrayStorage } from './LocalStorageHelpers';
import { toQueryString } from './ObjectConverters';

export const sleep = async (milliseconds: number) => {
  await new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export const addPrefixToValues = (obj: { [key: string]: string }, prefix: string) => {
  for (const item in obj) {
    obj[item] = prefix + ':' + obj[item];
  }
};

export const urlWithQuery = (url: string, data: { [key: string]: any }) => {
  let query = toQueryString(data);
  if (query) {
    query = `?${query}`;
  }
  return `${url}${query}`;
};

export const nameof = <T extends unknown>(name: Extract<keyof T, string>): string => name;

export const scrollTop = (duration?: number) => {
  scrollTo(0, { duration: duration });
  // KTUtil.scrollTop(0, duration);
};

export const getApiUrlPart = (url: string) => {
  return url.split('?')[0];
};

export const convertToNumberArray = (array: (string | number)[] | undefined) => {
  return array?.map((item) => parseInt(item as string));
};

export const scrollToDivElement = (elementRef: HTMLDivElement | null, duration?: number) => {
  if (elementRef) {
    const boundingClientRect = elementRef.getBoundingClientRect();
    scrollTo(boundingClientRect.top, { duration: duration });
  }
};

export const determineSortIcon = (value: SortOrder, ascendingOrUndefinedIcon: React.ReactElement, descendingIcon: React.ReactElement) => {
  if (value === 'Ascending' || value === undefined) {
    return ascendingOrUndefinedIcon;
  } else {
    return descendingIcon;
  }
};

export const determineNewSortOrder = (value: SortOrder): SortOrder => {
  switch (value) {
    case undefined:
      return 'Ascending';
    case 'Ascending':
      return 'Descending';
    case 'Descending':
      return undefined;
  }
};

export const getLodashOrderDirection = (value: SortOrder) => {
  switch (value) {
    case 'Ascending':
      return 'asc';
    case 'Descending':
      return 'desc';
  }
};

export const getDurationAsHoursAndMinutes = (duration: string) => {
  const durationMoment = moment.duration(duration);
  const durationHour = floor(durationMoment.asHours());
  const durationMinutes = floor(durationMoment.minutes());

  return `${durationHour}h ${durationMinutes}m`;
};

export const addToRareStorage = (obj: { message: string; data?: any }) => {
  addOrSetArrayStorage(LocalStorageKey.Rare, { ...obj, date: getNowISO() }, 100);
};
