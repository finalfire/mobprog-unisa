import {Button, View, Text} from 'react-native';

const App = () => {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline'

    }}>
      <Text style={{backgroundColor: 'red', color: 'white'
        }}>Todo ashdashdiashudhasiudhsauidhiuashduias</Text>
      <Button title="FATTO" onPress={()=>{}}/>
    </View>
  );
};

export default App;