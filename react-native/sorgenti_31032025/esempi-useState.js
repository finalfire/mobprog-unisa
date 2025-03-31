import {View, Button, Text} from 'react-native';
import {useState} from 'react';

const Counter = () => {
  // il valore iniziale dello stato è pari a 0
  // useState mi restituisce una coppia fatta [stateVariable, stateSetterFunction]
  // - la stateVariable è una variabile che mi permette di accedere (in sola lettura)
  //   al valore dello stato (in questo caso: count)
  // - la stateSetterFunction mi permette di modificare/aggiornare il valore dello stato
  //   (in questo caso: setCount)
  //   la stateSetterFunction è già implementata internamente da React, noi ci limitiamo
  //   ad utilizzarla
  /*const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("pippo");*/

  // qui utilizziamo un solo stato, il cui valore è un oggetto
  // il nome della state variable e della state setter function LO POSSIAMO SCEGLIERE NOI
  // per convenzione, si usa sostantivo e un setSostantivo
  const [data, setData] = useState({ count: 0, msg: "pippo" });
  
  return (
    <View>
      <Text>Il conteggio è: {data.count}</Text>
      <Text>La nuova stringa è: {data.msg}</Text>
      <Button
        // quando premo il button, voglio aggiungere 1 al valore corrente di count
        // => il nuovo valore di count sarà pari al vecchio + 1
        onPress = {() => { 
          setData({ count: data.count + 1, msg: data.msg});
        }}
        title = 'Aggiungi 1'
      />
      <Button
        onPress = {() => {
            if (data.msg === "pippo")
                setData({ count: data.count, msg: "topolino" });
            else
                setData({ count: data.count, msg: "pippo" });
        }}
        title = 'Cambia il messaggio'
      />
    </View>
  );
}

const App = () => {
  return <Counter />;
}

export default App;
