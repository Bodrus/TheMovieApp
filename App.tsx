import React from 'react';
import AppNavigator from './src/navigation/AppNavigator.tsx';
import { QueryProvider } from './src/domain/QueryProvider.tsx';

function App(): React.JSX.Element {
  return (
    <QueryProvider>
      <AppNavigator />
    </QueryProvider>
  );
}

export default App;
