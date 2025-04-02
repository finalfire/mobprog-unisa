import {SectionList, View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 12 },
  item: { fontColor: 'red'},
  header: {color: '#ff0000', fontSize: 34}
});


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

export default App;