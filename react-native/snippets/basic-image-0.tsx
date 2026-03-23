import React, { useState } from "react"; 
import { 
    View, 
    Image,
    Text
} from "react-native"; 
  
const App = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://i.vimeocdn.com/portrait/58832_300x300.jpg'}}
        width={300}
        height={300}
      />
      <Text>Ciao</Text>
    </View>
  )
}
  
export default App;