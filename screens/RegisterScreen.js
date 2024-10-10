// RegisterScreen.js

import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, getIdToken } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { sendTokenToBackend } from '../api';
import { colors, fonts } from '../theme';

WebBrowser.maybeCompleteAuthSession();

export default function RegisterScreen({ navigation }) {
  // Configure the Google sign-in request
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
        // Send the ID token to your backend
        await sendTokenToBackend(idTokenResult);
      }

      // After registration, navigate to LoginScreen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Google sign-up error:', error);
    }
  };

  const navigateToEmailRegister = () => {
    navigation.navigate('RegisterEmailPassword');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => promptAsync()}
        color={colors.secondary}
      />
      <Button title="Register with Email/Password" onPress={navigateToEmailRegister} color={colors.fourth} />
      <Button title="Go to Login" onPress={navigateToLogin} color={colors.fifth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fonts.title,
    color: colors.fifth,
    marginBottom: 20,
  },
});
