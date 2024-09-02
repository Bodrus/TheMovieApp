import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuthStore } from '../../stores/useAuthStore.ts';
import styles from './style.ts'; // Импортируем стили

const LoginScreen = () => {
  const authenticateUser = useAuthStore(state => state.authenticateUser);
  const error = useAuthStore(state => state.error);
  const loading = useAuthStore(state => state.loading);
  const [name, setName] = useState('');

  const handleLogin = () => {
    authenticateUser(name);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button title={loading ? 'Loading...' : 'Login'} onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
