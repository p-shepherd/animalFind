// StartScreen.js

import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../theme';

export default function StartScreen({ navigation }) {
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AnimalFind</Text>
      <Button title="Login" onPress={navigateToLogin} color={colors.secondary} />
      <Button title="Register" onPress={navigateToRegister} color={colors.third} />
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
