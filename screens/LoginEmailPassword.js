// LoginEmailPassword.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { colors, fonts } from '../theme';
import { sendTokenToBackend } from '../api';

export default function LoginEmailPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Sign in the user and get userCredential
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Use userCredential.user for the logged-in user

      if (user) {
        // Obtain the ID token
        const idTokenResult = await getIdToken(user);
        // Send the ID token to your backend
        await sendTokenToBackend(idTokenResult);
      }

      // Navigate to HomeScreen after successful login
      navigation.navigate('Home');
    } catch (error) {
      console.log('Login error: ', error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Email/Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
      />
      <Button title="Login" onPress={handleLogin} color={colors.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: fonts.title,
    color: colors.fifth,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: colors.fourth,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
});
