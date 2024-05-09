import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Text,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
const dbPromise = SQLite.openDatabase({name: 'mio_database.db', location: 'default'});

const App = () => {
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    async function prepareDB() {
      const db = await dbPromise;
      await db.executeSql('CREATE TABLE IF NOT EXISTS utenti (matricola ... INTEGER PRIMARY KEY NOT NULL, nome TEXT, eta INTEGER, ruolo TEXT);');
    }
    prepareDB();
  }, []);

  const handleAddUser = async () => {
    try {
      const db = await dbPromise;
      const matricola = 0;
      await db.executeSql('INSERT INTO utenti (matricola, nome, eta, ruolo) VALUES (?, ?, ?, ?)', [matricola, 'Pluto', 25, 'Software Engineer']);
      setResult(`Aggiungo Pluto con matricola: ${matricola}`);
    } catch (error) {
      console.log(error);
      setResult('Errore nell\'aggiungere Pluto.');
    }
  };

  const readUser = async () => {
    try {
      const db = await dbPromise;
      var results = await db.executeSql('SELECT * FROM utenti WHERE matricola = 0');
      console.log(results[0].rows.raw());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button title="Aggiungi Pluto" onPress={handleAddUser} />
        <Button title="Fai una select" onPress={readUser} />
        <Text style={styles.resultText}>{result}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    marginTop: 20,
  },
});

export default App;