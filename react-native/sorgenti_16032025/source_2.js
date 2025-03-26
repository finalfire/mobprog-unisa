import {View, Text, TextInput} from 'react-native';

const Pippo = () => {
  let miostile = {color: 'blue',fontSize: 23};
  return (
    <View>
      <Text style={miostile}>Ciao, io sono...</Text>
      <TextInput
        style={
          {
            color: "red", height: 42, backgroundColor: 'black',
            borderWidth: 3, borderColor: 'green', padding: 8
           }
        }
        defaultValue="questo è il testo di default del TextInput"
      />
    </View>
  );
}

export default Pippo;