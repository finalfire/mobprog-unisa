import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const appTitle = 'Validazione Form';

    return MaterialApp(
      title: appTitle,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(appTitle),
        ),
        body: const MyCustomForm(),
      ),
    );
  }
}

// Rappresenta il nostro form
class MyCustomForm extends StatefulWidget {
  const MyCustomForm({super.key});

  @override
  MyCustomFormState createState() {
    return MyCustomFormState();
  }
}

// Lo State memorizza le informazioni del form.
class MyCustomFormState extends State<MyCustomForm> {
  // Creiamo una chiave globale che identifica univocamente
  // il widget del Form e permette di fare la validazione.
  // NB: questa è una GlobalKey<FormState>, FormState è una
  // classe che rappresenta lo State di un Form generico
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    // La key è necessaria per creare il Form
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextFormField(
            // La proprietà validator accetta una funzione di callback
            // che riceve il testo inserito nel TextField e lo valida
            // In questo caso, diamo un errore se il testo è null o vuoto
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Per favore, inserisci del testo.';
              }
              return null;
            },
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 16),
            child: ElevatedButton(
              onPressed: () {
                // .validate() ritorna true se il form è valido, altrimenti false
                if (_formKey.currentState!.validate()) {
                  // Se è valido, mostriamo una SnackBar
                  // Tipicamente qui faremo una chiamata ad un server o
                  // qualche task di update (es, scriviamo su un db)
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Sto processando i dati...')),
                  );
                }
              },
              child: const Text('Invia'),
            ),
          ),
        ],
      ),
    );
  }
}
