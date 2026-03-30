import * as React from "react";
import { View, Button, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome!</Text>
      <Button
        title="Vai ad About"
        onPress={() => {
          navigation.navigate("About", {
            foo: 42,
            bar: "MobProg",
          });
        }}
      />
    </View>
  );
}

function AboutScreen({ route, navigation }) {
  // route.params è l'oggetto contenente i parametri
  const { foo, bar } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Informazioni</Text>
      <Text>foo: {JSON.stringify(foo)}</Text>
      <Text>bar: {JSON.stringify(bar)}</Text>
      <Button
        title="Vai ancora ad About"
        onPress={() =>
          // qui non passo alcun valore per bar, quindi sarà undefined
          // e nel prossimom AboutScreen non apparirà alcunché
          navigation.push("About", {
            foo: 24,
          })
        }
      />
      <Button
        title="Vai al Welcome"
        onPress={() => navigation.navigate("Welcome")}
      />
      <Button title="Vai indietro" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: "Il mio Welcome Screen" }}
          initialParams={{ foo: 41, bar: "Valore iniziale di default" }}
        />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
