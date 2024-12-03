import React, { useState, useEffect, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import LocationPermissionScreen from './pages/LocationPermissionScreen';
import ItemSelectionScreen from './pages/ItemSelectionScreen';
import ItemPage from './pages/ItemPage';
import ItemDetail from './pages/ItemDetail';

const Stack = createNativeStackNavigator();
export const AppContext = createContext();

export default function App() {
  const [marketItems, setMarketItems] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const userID = 2; // FOR TESTING ONLY

  async function fetchData() {
    setLoading(true);
    try {
      //Fetches market and userItems
      const [marketResponse, itemsResponse] = await Promise.all([
        fetch(`https://bombasticweb-dmenc3dmg9hhcxgk.canadaeast-01.azurewebsites.net/market/${userID}`),
        fetch(`https://bombasticweb-dmenc3dmg9hhcxgk.canadaeast-01.azurewebsites.net/items/${userID}`)
      ]);

      if (!marketResponse.ok || !itemsResponse.ok) {
        throw new Error('Failed to fetch data.');
      }

      const [marketJson, itemsJson] = await Promise.all([marketResponse.json(), itemsResponse.json()]);

      // Sets variables
      setMarketItems(marketJson);
      setUserItems(itemsJson);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { //fetches each time app reloaded
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ marketItems, userItems, fetchData, loading }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="LocationPermissionScreen" component={LocationPermissionScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ItemSelectionScreen" component={ItemSelectionScreen} />
          <Stack.Screen name="ItemPage" component={ItemPage} />
          <Stack.Screen name="ItemDetail" component={ItemDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}