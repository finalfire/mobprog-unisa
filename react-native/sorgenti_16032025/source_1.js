import { Text } from 'react-native';

const sommaInStr = (a, b) => {
  let somma = a + b;
  let s = 'La somma tra ' + a + ' e ' + b + ' è pari a ' + somma;
  return somma;
}

const IlMioComponentePrincipale = () => {
  let r = sommaInStr(22, 20);
  return [<Text>{ r }</Text>, <Text>ciao</Text>];
}

// export default serve a indicare a React Native qual è
// l'entrypoint della mia app
export default IlMioComponentePrincipale;