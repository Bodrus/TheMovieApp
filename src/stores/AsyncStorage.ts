import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export enum AsyncStorageKeys {
  userId = 'user-id', // Добавляйте ключи по мере необходимости
}

export const clearAsyncStorage = () => storage.clearAll();

export const getAsyncStorageItem = (key: AsyncStorageKeys) =>
  storage.getString(key);

export const setAsyncStorageItem = (
  key: AsyncStorageKeys,
  value: string | object,
) => {
  if (typeof value === 'object') {
    return storage.set(key, JSON.stringify(value));
  }
  return storage.set(key, value);
};

export const removeAsyncStorageItem = (key: AsyncStorageKeys) =>
  storage.delete(key);

export const clientPersister = createSyncStoragePersister({
  storage: {
    setItem: (key, value) => storage.set(key, value),
    getItem: key => storage.getString(key) ?? null,
    removeItem: key => storage.delete(key),
  },
});
