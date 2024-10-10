// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginEmailPassword from './screens/LoginEmailPassword';
import RegisterEmailPassword from './screens/RegisterEmailPassword';
import HomeScreen from './screens/HomeScreen'; // Import the HomeScreen
import { colors } from './theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerStyle: { backgroundColor: colors.fourth },
          headerTintColor: colors.primary,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="LoginEmailPassword" component={LoginEmailPassword} options={{ title: 'Login with Email' }} />
        <Stack.Screen name="RegisterEmailPassword" component={RegisterEmailPassword} options={{ title: 'Register with Email' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
