import * as React from 'react';
import {useState} from 'react';
import { View, Button, Text, TextInput } from 'react-native';
// NavigationContainer serve a creare l'entrypoint in cui inserire i navigator
import { NavigationContainer } from '@react-navigation/native';
// La funzione che serve a creare un navigator di tipo stack
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// La funzione che serve a creare un navigator di topo bottom tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Profile = ({ navigation }) => { 
  return (
    <View>
      <Text>Il mio profilo</Text>
      <Button
        title="Vai alla pagina Settings"
        onPress={() => { navigation.navigate("Settings") }}
      ></Button>
    </View>
  );
};
const Messages = () => { return <Text>I miei messaggi</Text> };
const Feed = () => { return <Text>Il mio feed</Text> };
const Settings = ({ navigation }) => { 
  return (
    <View>
      <Text>Il mio profilo</Text>
      <Button
        title="Vai alla pagina Home"
        onPress={() => { navigation.navigate("Home") }}
      ></Button>
      <Button
        title="Vai alla pagina Feed"
        onPress={() => { navigation.navigate("Messages") }}
      ></Button>
    </View>
  );
};

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
  // Lo screen Home è il primo schermo che viene visualizzato
  // se non specifico lo screen iniziale per il navigator, allora il primo in ordine
  // verrà visualizzato
  // Se visualizzo uno screen che non fa parte del tab, allora il tab menu non
  // viene visualizzato
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;