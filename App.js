import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importing new pages
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import LocationPermissionScreen from './pages/LocationPermissionScreen';
import ItemSelectionScreen from './pages/ItemSelectionScreen';
import ItemPage from './pages/ItemPage';
import SettingsScreen from './pages/settingsPage';

import ItemDetail from './pages/ItemDetail'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="LocationPermissionScreen" component={LocationPermissionScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ItemSelectionScreen" component={ItemSelectionScreen} />
        <Stack.Screen name="ItemPage" component={ItemPage} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
