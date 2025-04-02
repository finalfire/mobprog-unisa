import React from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';

const App = () => {
  const creaAlert = () =>
    Alert.alert('Alert', 'foo + bar = baz', [
      {text: 'Va bene', onPress: () => console.log('Premuto!')},
    ]);

  return (
    <View style={styles.container}>
      <Button title={'Cliccami'} onPress={creaAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default App;