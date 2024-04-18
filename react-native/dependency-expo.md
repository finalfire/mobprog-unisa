# Utilizzare dipendenze estrerne su Expo Snack

Per utilizzare le dipendenze React in un progetto su Expo Snack, basta aggiornare il file `package.json` con le dipendenze richieste.

Ad esempio, supponiamo di avere il seguente codice (esempio navigazione in React Native) in `App.js``

```javascript
import * as React from 'react';
import {useState} from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MainScreen = ({route, navigation}) => {
  React.useEffect(() => {
    if (route.params?.post) {
      // fai qualcosa col post
      console.log("Post scritto: " + route.params.post);
    }
  }, [route.params?.post]);

  return (
    <View>
      <Button
        title='Scrivi un post!'
        onPress={() => navigation.navigate("Post")}
      ></Button>
      <Text>Il tuo post: {route.params?.post}</Text>
    </View>
  )
}

const PostScreen = ({route, navigation}) => {
  const [post, setPost] = useState('');
  return (
    <View>
      <TextInput
        multiline
        placeholder='Scrivi il tuo post...'
        value={post}
        onChangeText={setPost}
      ></TextInput>
      <Button
        title='Pubblica'
        onPress={() => {
          navigation.navigate({
            name: "Main",
            params: { post: post },
            merge: true,
          });
        }}
      ></Button>
    </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen}/>
        <Stack.Screen name="Post" component={PostScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

Affinché tutto funzioni correttamente, questo codice necessita delle dipendenze `@react-navigation/native` e `@react-navigation/native-stack`. Per farlo, basta dichiararle nel `package.json`:

```
{
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "react-native-paper": "4.9.2",
    "react-native-screens": "~3.29.0",
    "@react-navigation/native": "^6.1.17",
    "@react-navigation/native-stack": "^6.9.26",
    "react-native-safe-area-context": "4.8.2"
  }
}
```

Esse possono anche essere aggiunte automaticamente. Infatti, Expo Snack dovrebbe rivelare la presenza di dipendenze nel codice, e mostrare una opzione *[Add dependency]*, che inserisce automaticamente le dipendenze nel `package.json`.

(Si ringrazia Luca Dello Russo per la segnalazione)