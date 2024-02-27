import React, { PropsWithChildren } from 'react';
import {
  Text,
  View,
} from 'react-native';

type WrapperProps = PropsWithChildren<{
  aValue: string,
  aFunc: (a: number, b: number) => number
}>;

const Wrapper = ({
  aValue,
  aFunc,
  children
}: WrapperProps) => (
  <View>
    <Text>Valore: { aValue }</Text>
    <Text>Risultato: { aFunc(4,5) }</Text>
    <View>
      {children}
    </View>
  </View>
);

const App = () => {
  return (
    <Wrapper
      aValue="Hello, World!"
      aFunc={(a,b) => a + b}
    >
      <Text>Figlio n. 1</Text>
      <Text>Figlio n. 2</Text>
    </Wrapper>
  );
}

export default App;