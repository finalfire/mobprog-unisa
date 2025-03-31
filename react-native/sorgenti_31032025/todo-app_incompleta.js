import { Text, Button, View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

// StyleSheet.create() crea un nuovo foglio di stile
// che possiamo utilizzare per applicare uno stile
// ai componenti; prende in input un oggetto che rappresenta
// uno o più stili
const styles = StyleSheet.create({
    vistaPrincipale: { padding: 13 },
    titolo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ff2d42',
    },
    sottotitolo: {
        fontSize: 20, fontWeight: '300',
        color: '#d90429', marginBottom: 33
    },

    input: {
        backgroundColor: '#edf2f4', // colore di sfondo
        borderWidth: 1, // spessore del bordo
        borderColor: '#d9029', // colore del bordo
        padding: 8, // padding all'interno della textinput
        marginVertical: 8
    }
});

const App = () => {
    // definizione dello stato che conterrà il valore
    // della textinput; perché usare uno stato?
    // si usa uno stato poiché il valore della textinput
    // potrebbe cambiare a tempo di esecuzione dell'app
    const [todo, setTodo] = useState(""); 

    return (
        <View style={styles.vistaPrincipale}>
            <Text style={styles.titolo}>ToDos App</Text>
            <Text style={styles.sottotitolo}>Mobile Programming - 2024/2025</Text>
            <Text>Il testo inserito è {todo}</Text>
            <TextInput
                style={styles.input}
                //onChangeText = {(testo) => { setTodo(testo) }}
                onChangeText = {setTodo}
                placeholder = "Cosa vuoi fare?"
            ></TextInput>
            <Button
                // la arrow function qui non fa nulla
                onPress = {() => {return;}}
                title = "AGGIUNGI"
            ></Button>
        </View>
    )
}

export default App;