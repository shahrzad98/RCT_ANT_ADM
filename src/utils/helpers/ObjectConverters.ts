import queryString, { StringifiableRecord, StringifyOptions } from 'query-string';

import { RouteFilterObject } from '../../types';

export const toQueryString = (obj: StringifiableRecord, arrayFormat: StringifyOptions['arrayFormat'] = 'none', arrayFormatSeparator?: string): string => {
  return queryString.stringify(obj, { arrayFormat: arrayFormat, arrayFormatSeparator: arrayFormatSeparator ?? ',' });
};

export const fromQueryString = <T extends object>(query: string, arrayFormat: StringifyOptions['arrayFormat'] = 'none', arrayFormatSeparator?: string): T => {
  return queryString.parse(query, { arrayFormat: arrayFormat, arrayFormatSeparator: arrayFormatSeparator ?? ',' }) as T;
};

export const toJson = (obj: object): string | null => {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const fromJson = (json: string): object | null => {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const toIndeterminateBoolean = (text: string | undefined) => {
  switch (text?.toLowerCase()) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return undefined;
  }
};

export const toBoolean = (text: string | boolean | undefined): boolean => {
  if (typeof text === 'boolean') {
    return text;
  }

  switch (text?.toLowerCase()) {
    case 'true':
      return true;
    default:
    case 'false':
      return false;
  }
};

export const toUndefinedIfEmptyString = (text: string | undefined) => {
  if (!text) {
    return undefined;
  }
  return text;
};

export const parseIntOrUndefined = (num: string | undefined) => {
  if (!num) {
    return undefined;
  }
  return parseInt(num);
};

export const createFilterObject = (routeFilterObjects: RouteFilterObject[]) => {
  let filterObject: { [key: string]: string | number | boolean | undefined } = {};
  for (const item of routeFilterObjects) {
    switch (item.type) {
      case 'string':
        filterObject[item.key] = toUndefinedIfEmptyString(item.value);
        break;
      case 'number':
        filterObject[item.key] = parseIntOrUndefined(item.value);
        break;
      case 'boolean':
        filterObject[item.key] = toIndeterminateBoolean(item.value);
        break;
    }
  }
  return filterObject;
};
