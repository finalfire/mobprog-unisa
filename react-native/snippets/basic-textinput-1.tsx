import React, { useState } from "react"; 
import { View, Text, TextInput } from "react-native"; 
  
const App = () => {
  const [content, setContent] = useState<string>('');

  return (
    <View>
      <TextInput
        placeholder="Scrivi qui..."
        onChangeText={setContent}
        value={content}
      />
      <Text>Hai scritto: {content}</Text>
    </View>
  )
}
  
export default App;