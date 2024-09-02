import React, { ReactNode, useEffect } from 'react';
import { AppState } from 'react-native';
import { focusManager } from '@tanstack/query-core';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { queryClient } from './queryClient.ts';
import { clientPersister } from '../stores/AsyncStorage.ts';

interface Props {
  children?: ReactNode;
}

export const QueryProvider = ({ children }: Props) => {
  useEffect(() => {
    const subs = AppState.addEventListener('change', state => {
      focusManager.setFocused(state === 'active');
    });

    return () => subs.remove();
  }, []);

  return (
    <PersistQueryClientProvider
      persistOptions={{
        persister: clientPersister,
      }}
      client={queryClient}>
      {children}
    </PersistQueryClientProvider>
  );
};
