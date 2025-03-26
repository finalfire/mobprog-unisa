import {View, Text} from 'react-native';

type PlanetProps = {
  nome: string;
  colore: string;
};

// props è un oggetto, i cui campi sono le
// proprietà del componente Planet
const Planet = (props: PlanetProps) => {
  // se il campo nome è undefined, quindi non è stato
  // passato un valore per la sua proprietà
  if (props.nome == undefined) {
    return <Text>Questo è il pianeta senza nome</Text>
  }
  return <Text>
          Questo è il pianeta { props.nome } con colore { props.colore}
         </Text>
}

const App = () => {
  return (
    <View>
      <Planet nome="Terra" colore="verde" ciao="x"/>
      <Planet/>
      <Planet colore="rosso"/>
    </View>
  );
}

export default App;