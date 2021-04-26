import { AxiosInstanceData } from '../../types';
import { getApiUrlPart, getStorage } from '../../utils/helpers';
import { LocalStorageKey } from '../constants';

export const setupAxiosInstances = (axiosInstancesData: AxiosInstanceData[]) => {
  const language = getStorage(LocalStorageKey.Culture);

  for (const item of axiosInstancesData) {
    item.instance.interceptors.request.use((config) => {
      if (config.url) {
        const urlKey = getApiUrlPart(config.url);

        config.apiDataItem = item.DataMap.MapObject.get(urlKey);
      }
      return config;
    });
    item.instance.defaults.headers['Accept-Language'] = language;


    for (const key of Object.values(item.DataMap.Urls)) {
      item.DataMap.MapObject.set(key, {});
    }
  }
};
