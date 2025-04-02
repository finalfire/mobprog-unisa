import React, { useState } from "react"; 
import { View, Text, Button } from "react-native"; 
  
const App = () => {
  const [myVal, setMyVal] = useState({color: 'black'});
  return (
    <View>
      <Text style={myVal}>Ciao!!</Text>
      <Button
        title='Tocca per cambiare!'
        onPress={() => { setMyVal({color: 'red'}) }}
      />
    </View>
  )
}
  
export default App;