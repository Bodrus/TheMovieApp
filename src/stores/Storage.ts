import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export enum StorageKeys {
  userName = 'user-name', // Добавляйте ключи по мере необходимости
}

export const clearStorage = () => storage.clearAll();

export const getStorageItem = (key: StorageKeys) => storage.getString(key);

export const setStorageItem = (key: StorageKeys, value: string | object) => {
  if (typeof value === 'object') {
    return storage.set(key, JSON.stringify(value));
  }
  return storage.set(key, value);
};

export const removeAsyncStorageItem = (key: StorageKeys) => storage.delete(key);

export const clientPersister = createSyncStoragePersister({
  storage: {
    setItem: (key, value) => storage.set(key, value),
    getItem: key => storage.getString(key) ?? null,
    removeItem: key => storage.delete(key),
  },
});
