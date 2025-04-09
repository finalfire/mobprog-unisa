import * as React from 'react';
import {useState} from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MainScreen = ({route, navigation}) => {
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
  const [post, setPost] = useState<string>('');
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