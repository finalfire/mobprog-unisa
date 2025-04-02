import React, {useState} from 'react';
import {Text, View, FlatList} from 'react-native';

const App = () => {
  const myData = [
    {user: 'foo'},
    {user: 'bar'}
  ];

  return (
    <View>
      <FlatList
        data={myData}
        renderItem={({item}) => { 
          return <Text>{item.user}</Text>
        }}
      />
    </View>
  );
};

export default App;