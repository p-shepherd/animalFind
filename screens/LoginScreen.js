// LoginScreen.js

import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, getIdToken } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { sendTokenToBackend } from '../api';
import { colors, fonts } from '../theme';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
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

      // Navigate to HomeScreen after successful login
      navigation.navigate('Home');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const navigateToEmailLogin = () => {
    navigation.navigate('LoginEmailPassword');
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => promptAsync()}
        color={colors.secondary}
      />
      <Button title="Login with Email/Password" onPress={navigateToEmailLogin} color={colors.fourth} />
      <Button title="Go to Register" onPress={navigateToRegister} color={colors.fifth} />
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
