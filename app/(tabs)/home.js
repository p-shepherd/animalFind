// HomeScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';



import { getIdToken } from 'firebase/auth';
import { sendTokenToBackend } from '../../constants/api';
import { auth } from '../../constants/firebaseConfig';
import { useRouter } from  'expo-router'



export default function HomeScreen({}) {
  const router = useRouter();
 
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
   
    color: 'black',
    marginBottom: 20,
  },
});
