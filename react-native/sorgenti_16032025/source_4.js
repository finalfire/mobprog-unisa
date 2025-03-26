import {View, Text, Button} from 'react-native';

const Counter = () => {
  let count = 0;
  return (
    <View>
      <Text>Il conteggio è: {count}</Text>
      <Button
        onPress = {() => { count += 1; }} // non funziona!
        title = 'Aggiungi 1'
      />
    </View>
  );
}

const App = () => {
  return <Counter />;
}

export default App;