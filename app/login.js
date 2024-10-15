import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { sendTokenToBackend } from '../constants/api';
import { auth } from '../constants/firebaseConfig';
import { useRouter } from  'expo-router'


export default function LoginEmailPassword({}) {

  
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        const idTokenResult = await getIdToken(user);
        await sendTokenToBackend(idTokenResult);
      }

      router.push('home')

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
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the full height
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30, // Add padding to move content away from the edges
  },
  title: {
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderColor: 'black',
  },
  buttonText: {
    color: 'white',
  },
  loginButton: {
    backgroundColor: "#011627",
    padding: 15, // Increase padding for better touch area
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 20, // Add margin to separate the button from inputs
  },
});
