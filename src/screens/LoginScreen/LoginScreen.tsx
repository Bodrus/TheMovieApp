import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuthStore } from '../../stores/useAuthStore.ts';

const LoginScreen = () => {
  const authenticateUser = useAuthStore(state => state.authenticateUser);
  const error = useAuthStore(state => state.error);
  const loading = useAuthStore(state => state.loading);
  const [name, setName] = useState('');

  const handleLogin = () => {
    authenticateUser(name);
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={{
          marginBottom: 16,
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 8,
        }}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button title={loading ? 'Loading...' : 'Login'} onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
