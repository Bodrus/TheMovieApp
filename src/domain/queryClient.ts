import NetInfo from '@react-native-community/netinfo';
import {
  MutationCache,
  onlineManager,
  QueryCache,
  QueryClient,
} from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: error => {
      if (error) {
        showMessage({ message: error.message, type: 'danger' });
      }
    },
  }),
  queryCache: new QueryCache({
    onError: error => {
      if (error) {
        showMessage({ message: error.message, type: 'danger' });
      }
    },
  }),
  defaultOptions: {
    queries: {
      gcTime: 86400000, // 24H
      staleTime: 15000,
      retry: 5,
    },
  },
});

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

export {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
