import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
} from 'react-native';

const DATA = [
  {title: 'Primi piatti',
  data: ['Pizza', 'Pasta', 'Risotto'],},
  {title: 'Contorni',
  data: ['Insalata', 'Verdure grigliate'],},
];

const App = () => (
  <View style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 4,
    marginVertical: 2,
  },
  header: {
    fontSize: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 12,
  },
});

export default App;