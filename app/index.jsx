
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';


import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import * as Google from 'expo-auth-session/providers/google';

import { GoogleAuthProvider, signInWithCredential, getIdToken } from 'firebase/auth';

import { sendTokenToBackend } from '../constants/api';
import { auth } from '../constants/firebaseConfig';

export default function StartScreen({}) {
  const router = useRouter();
 

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '168448121889-lm4hfiktm3a29u4298oo4f27hrsuakk4.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleSignIn(authentication.idToken);
    }
  }, [response]);

  const handleGoogleSignIn = async (idToken) => {
    try {
      // Create a Firebase credential with the Google ID token
      const credential = GoogleAuthProvider.credential(idToken);
      // Sign in with credential from the Google user
      await signInWithCredential(auth, credential);

      // Obtain the ID token from Firebase
      const user = auth.currentUser;
      if (user) {
        const idTokenResult = await getIdToken(user);
        // Send the ID token to your backend (if needed)
        await sendTokenToBackend(idTokenResult);
      }

      // Navigate to HomeScreen after successful login
      router.push('home');

    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      
      <View style={styles.picture}>
        <Text style={styles.title}>Welcome to AnimalFind</Text>
      </View>

    
      <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
        <Image 
          source={require('../assets/images/google_logo.png')} // or use a URL
          style={styles.googleLogo}
        />
      </TouchableOpacity>

      <View style={styles.subcontainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('login')} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => router.push('register')} >
          <Text style={styles.buttonTextRegister}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    
    color: 'black',
    marginBottom: 20,
  },
  picture: {
    flex: 13, // Picture takes up most of the height
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row', // Row layout to place text and image side by side
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '90%', // Make the button fit nicely in the view
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#011627',
  },
  googleButtonText: {
    color: '#011627',
    fontWeight: 'bold',
    
    marginRight: 10, // Space between text and logo
  },
  googleLogo: {
    width: 20,
    height: 20,
  },
  subcontainer: {
    flex: 1, // Button container takes up remaining height
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loginButton: {
    flex: 1, 
    backgroundColor: "#011627",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  registerButton: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
    borderColor: '#011627',
    borderWidth: 1,
  },
  buttonText: {
    
    color: 'white',
  },
  buttonTextRegister: { 
    
    color: 'white',
  },
});
