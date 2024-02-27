import React, { useState } from "react"; 
import { 
    View, 
    Image
} from "react-native"; 
  
const BasicImage_1 = () => {
  return (
    <View>
      <Image
        source={require('./logo_unisa.png')}
      />
    </View>
  )
}
  
export default BasicImage_1;