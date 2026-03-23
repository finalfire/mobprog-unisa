import React, { useState } from "react"; 
import { ScrollView, Text } from "react-native"; 

const Comp = () => {
  return <Text style={{ fontSize: 55 }}>MobProg Unisa 2023/24</Text>
}
  
const App = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Comp />
      <Comp />
      <Comp />
      <Comp />
      <Comp />
      <Comp />
      <Comp />
      <Comp />
      <Comp />
      <Comp />
      <Comp />
      <Comp />
    </ScrollView>
  )
}
  
export default App;