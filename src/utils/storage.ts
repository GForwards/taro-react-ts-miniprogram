import Taro from '@tarojs/taro';
import { create } from 'mobx-persist';

const storage = {
  getItem(key) {
    return Taro.getStorage({ key }).then((res) => res.data);
  },
  setItem(key, data) {
    return Taro.setStorage({ key, data });
  },
};

export interface SessionStorageData {
  data: any;
  // 过期时间，为 -1 代表不过期
  expiredTime: number;
}

const sessionStorage = {
  _map: new Map<string, SessionStorageData>(),
  setItem(
    key: string,
    data: any,
    options: {
      // 有效时长，为 -1 代表不过期
      expires?: number;
    },
  ) {
    const { expires = -1 } = options;
    const storageData = {
      data,
      expiredTime: expires === -1 ? -1 : Date.now() + expires,
    };
    Taro.setStorageSync(key, storageData);
    // this._map.set(key, storageData);
  },
  getItem(key: string) {
    // const storageData: SessionStorageData | undefined = this._map.get(key);
    const storageData: SessionStorageData | undefined = Taro.getStorageSync(key);
    if (storageData) {
      const { data, expiredTime } = storageData;
      if (expiredTime === -1 || expiredTime > Date.now()) {
        return data;
      } else {
        // this._map.delete(key);
        Taro.removeStorageSync(key);
        return undefined;
      }
    }
    return undefined;
  },
};

// mobx-persist 持久化存储
const hydrate = create({
  storage,
  debounce: 20,
  jsonify: false,
});

export { storage, sessionStorage, hydrate };
