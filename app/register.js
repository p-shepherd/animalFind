import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification, getIdToken } from 'firebase/auth';
import { sendTokenToBackend } from '../constants/api';
import { auth } from '../constants/firebaseConfig';
import { useRouter } from  'expo-router'


export default function RegisterEmailPassword({}) {

    const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await sendEmailVerification(user);
        const idTokenResult = await getIdToken(user);
        await sendTokenToBackend(idTokenResult);
      }

      router.push('login')
      alert('Registration successful! Please verify your email before logging in.');
    } catch (error) {
      console.log('Registration error: ', error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register with Email/Password</Text>
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
        textContentType="newPassword"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        textContentType="newPassword"
      />
      
      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderColor: 'black',
  },
  buttonText: {

   
    color: 'black',
  },
  registerButton: {
    backgroundColor: "none", // Using secondary color for the register button
    padding: 15, // Increase padding for better touch area
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 20, // Add margin to separate the button from inputs
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
  },
});
