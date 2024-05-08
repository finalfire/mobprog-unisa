import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Esempio valore TextField',
      home: MyCustomForm(),
    );
  }
}

// Definiamo uno StatefulWidget
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  State<MyCustomForm> createState() => _MyCustomFormState();
}

// Definiamo lo State corrispondente.
// In questa classe tipicamente memorizziamo tutte le informazioni del form.
class _MyCustomFormState extends State<MyCustomForm> {
  // Creiamo un TextEditingController e lo usiamo per recuperare il valore nel TextField
  final myController = TextEditingController();

  @override
  void dispose() {
    // dispose() serve a rimuovere il controller quando il widget non sarà più attivo
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Esempio valore TextInput'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: TextField(
          // Qui associamo effettivamente il controller al TextField
          controller: myController,
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // Quando l'utente preme sul bottone, un alert mostra il contenuto del TextField
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                // myController.text è il testo nel TextField
                content: Text(myController.text),
              );
            },
          );
        },
        child: const Icon(Icons.text_fields),
      ),
    );
  }
}
