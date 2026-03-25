import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,
  SafeAreaView, TextInput, Button, FlatList } from 'react-native';
import { useState } from 'react';

type TodoType = {
  id: number,   // mi identifica il todo nella lista
  todo: string  // il testo del todo
}

export default function App() {
  const [todoCorrente, setTodoCorrente] = useState<string>('');
  const [listaTodo, setListaTodo] = useState<TodoType[]>([]);

  const RenderTodo = ({item}: {item: TodoType}) => {
    let thisTodoId = item.id;

    return (
      <View style={styles.todoView}>
        <Text style={styles.todoText}>{item.todo}</Text>
        <Button
          title="Fatto"
          onPress={() => {
            // facciamo una copia della lista attuale di todo
            const nuovaLista = [...listaTodo];
            // cerchiamo l'indice del todo da rimuovere
            const indexTodo = nuovaLista.findIndex(todoInLista => {
              todoInLista.id == thisTodoId
            });

            console.log("Todo Id da togliere: " + thisTodoId);
            console.log("Todo Id trovato " + indexTodo);

            nuovaLista.splice(indexTodo, 1);
            setListaTodo(nuovaLista);
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
          <Text style={styles.title}>TodoApp</Text>
          <Text style={styles.subtitle}>Mobile Programming - 2025/26</Text>
          <TextInput
            style={styles.input}
            value={todoCorrente}
            placeholder='Cosa vuoi fare?'
            onChangeText={setTodoCorrente}
          />
          <Button
            title='Aggiungi'
            onPress={() => {
              const nuovoTodo: TodoType = {
                id: listaTodo.length,
                todo: todoCorrente
              };
              setListaTodo([...listaTodo, nuovoTodo]);
              setTodoCorrente('');
            }}
          />
          <FlatList
            data={listaTodo}
            renderItem={RenderTodo}
          />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 33,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: { fontSize: 30, fontWeight: 'bold', color: '#2b2d42',
    marginTop: 33
   },
  subtitle: { fontSize: 20, fontWeight: '300', color: '#d90429',
    marginBottom: 33},
  input: { backgroundColor: '#edf2f4', borderWidth: 1,
    borderColor: '#cccccc', marginVertical: 8, padding: 8
  },
  todoView: { flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center'},
  todoText: { fontSize: 18, color: '#2b2d42' }
});
