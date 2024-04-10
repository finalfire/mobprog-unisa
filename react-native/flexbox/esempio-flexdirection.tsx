import React from 'react';
import {View} from 'react-native';

const App = () => {
  return (
    // il genitore deve sempre avere una dimensione
    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
      <View style={{flex: 1, backgroundColor: 'powderblue'}}></View>
      <View style={{flex: 1, backgroundColor: 'skyblue'}}></View>
      <View style={{flex: 1, backgroundColor: 'steelblue'}}></View>
    </View>
  )
}

export default App;