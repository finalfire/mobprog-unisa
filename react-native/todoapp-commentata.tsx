import React, { useState } from "react"; 
import { 
    View, 
    Text, 
    TextInput, 
    FlatList, 
    Button,
    ScrollView,
    // SafeAreaView si usa per quelle view che conterranno del contenuto dinamico
    SafeAreaView,
    StyleSheet,
} from "react-native"; 

// TodoType mi indica come è fatto ogni item (todo) della mia lista
// id = identificativo del todo
// todo = il testo del todo
type TodoType = {
    id: number,
    todo: string
}

const App = () => {
    // Primo stato, si occupa della gestione del textinput
    //  in currentTodo ho quello che l'utente va a scrivere nel textinput
    const [currentTodo, setCurrentTodo] = useState<string>('');
    // Secondo stato, si occupa della gestione della lista dei todo
    //  todos = un array i cui elementi sono oggetti di tipo TodoType
    //          è inizializzata come un array vuoto
    const [todos, setTodos] = useState<TodoType[]>([]);
    
    // renderTodo viene utilizzata per eseguire il rendering di ogni item
    // della lista; accetta come parametro un oggetto che ha almeno un campo
    // chiamato item; questo è l'item (singolo) che verrà renderizzato
    // da documentazione, la funzione che si occupa di fare il rendering
    // accetta un oggetto (questo oggetto è di un tipo particolare che eredita
    // dalla FlatList)
    const renderTodo = ({item}: {item: TodoType}) => {
      return (
        <View style={styles.todoView}>
          <Text style={styles.todoText}>{item.todo}</Text>
          <Button
            title="Fatto"
            onPress={() => {
              // questa parte viene invocata quando l'utente preme su Fatto
              // crea una copia dell'array todos
              // ... questo è l'operatore di spreading
              // es: [...[3,8,5]] => [3,8,5]
              const updateTodos = [...todos];
              // array.splice = "taglia" un array da un certo indice fino ad un altro
              // es: ['a','b','d'].splice(1,1) => ['a','d']
              // es: ['a','b','d'].splice(1) => ['a']
              // array.findIndex(e) => restituisce l'indice dell'elemento e dentro l'array
              // es: ['a','b','d'].findIndex('d') => 2
              // passando una closure, restituisce l'elemento dove il risultato della closure
              // è vero
              updateTodos.splice(updateTodos.findIndex((e) => e.id == item.id), 1);
              // a questo punto updateTodos è il mio array di todo senza quello che
              // ho scelto di rimuovere
              // aggiorno todos con updateTodos
              setTodos(updateTodos);
            }}
          />
        </View>
      )
    }
    
    // - generalmente si usa SafeAreaView quando ho dei figli
    //   che renderizzeranno del contenuto dinamico (es, FlatList)
    // - usiamo ScrollView perché la FlatList potrebbe crescere e andare
    //   fuori dallo schermo
    // - nella FlatList, ItemSeparatorComponent specifica il componente
    //   che deve esserci tra ogni item della lista
    return ( 
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
        <Text style={styles.title}>ToDos App</Text>
        <Text style={styles.subtitle}>Mobile Programming - 2023/2024</Text>
        <TextInput
          style = {styles.input}
          value = {currentTodo}
          placeholder = "Cosa vuoi fare?"
          onChangeText = { setCurrentTodo }
        />
        <Button
          title = "Aggiungi"
          onPress = {() => {
            // questa viene eseguita quando clicco su Aggiungi
            // se il textinput contiene del testo...
            if (currentTodo) {
              // allora ho del testo da cui creare un nuovo oggetto TodoType
              // che andrò ad inserire nell'array di todo
              const todo: TodoType = {
                // l'identificativo del todo è dato dalla lunghezza corrente
                // dell'array di todo; questo serve ad assicurarci di avere un
                // identificativo univoco per ogni item
                id: todos.length,
                todo: currentTodo
              };
              
              // qui aggiungo a todos il nuovo todo creato
              // es: [...[3,4], 8] => [3,4,8]
              // todos.push(todo)
              // setTodos(todos)
              setTodos([...todos, todo]);
              // cancello il textinput
              setCurrentTodo('');
            }
          }}
        />
        <FlatList
          style = {styles.todos}
          data={todos}
          renderItem={renderTodo}
          ItemSeparatorComponent={() => <View style={styles.listSep} />}
        />
        </ScrollView>
      </SafeAreaView>
    )
  }

  // styles indica il foglio di stile da cui vado a prendere
  // gli stili che uso nella mia app
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1, // prendi tutto lo spazio disponible sul main axis
      paddingTop: 20,
      width: '100%',
      alignItems: 'center',     // come sono allineati i componenti sul main axis
      justifyContent: 'center'  // come sono allineati i componeti sul cross axis
    },
  
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#2b2d42'
    },
  
    subtitle: {
      fontSize: 20,
      fontWeight: '300',
      color: '#d90429',
      marginBottom: 33
    },
  
    input: {
      backgroundColor: '#edf2f4',
      borderWidth: 1,
      borderColor: '#cccccc',
      marginVertical: 8,
      padding: 8
    },
  
    todos: {
      marginVertical: 33
    },
  
    listSep: {
      height: 8
    },
    
    // questo è lo stile di ogni item della lista
    todoView: {
      // indica che i componenti devono essere stesi sulla riga
      flexDirection: 'row',
      // indica di inserire di equidistanziare i componenti
      // occupando tutto lo spazio disponibile
      justifyContent: 'space-between'
    },
  
    todoText: {
      fontSize: 18,
      color: '#2b2d42'
    }
  });

export default App;