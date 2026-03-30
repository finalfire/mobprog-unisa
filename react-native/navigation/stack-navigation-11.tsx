import * as React from 'react';
import {useState} from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Profile = () => { return <Text>Il mio profilo</Text> };
const Messages = () => { return <Text>I miei messaggi</Text> };
const Feed = () => { return <Text>Il mio feed</Text> };
const Settings = () => { return <Text>Le mie preferenze</Text> };

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;