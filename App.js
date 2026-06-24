import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase'; // <--- CORRIGIDO COM ./

import HomeScreen from './screens/HomeScreen';
import MyAdsScreen from './screens/MyAdsScreen';
import NewAdScreen from './screens/NewAdScreen';
import ProfileScreen from './screens/ProfileScreen';
import Header from './components/Header';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />, 
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="NewAd" component={NewAdScreen} />
        <Stack.Screen name="MyAds" component={MyAdsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}