import React, { useState } from "react"; 
import { 
    View, 
    Text, 
    TextInput, 
    FlatList, 
    Button,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    StatusBar
} from "react-native"; 

type TodoType = {
  id: number,
  todo: string
}
  
const App = () => {
  const [currentTodo, setCurrentTodo] = useState<string>('');
  const [todos, setTodos] = useState<TodoType[]>([]);
  
  const renderTodo = ({item}: {item: TodoType}) => {
    return (
      <View style={styles.todoView}>
        <Text style={styles.todoText}>{item.todo}</Text>
        <Button
          title="Fatto"
          onPress={() => {
            const updateTodos = [...todos];
            updateTodos.splice(updateTodos.findIndex((e) => e.id == item.id), 1);
            setTodos(updateTodos);
          }}
        />
      </View>
    )
  }

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
          if (currentTodo) {
            const todo: TodoType = {
              id: todos.length,
              todo: currentTodo
            };

            setTodos([...todos, todo]);
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
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

  todoView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  todoText: {
    fontSize: 18,
    color: '#2b2d42'
  }
});
  
export default App;
