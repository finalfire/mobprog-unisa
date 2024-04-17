import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget {
  const MyAppBar({required this.title, super.key});

  // In una sottoclasse Widget i campi sono sempre final
  final Widget title;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56, // pixel logici
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(color: Colors.blue[500]),

      // Con Row renderizziamo i figli in orizzontale, da sx verso dx
      child: Row(
        children: [
          // IconButton è un Button che oltre al testo accetta anche una icona
          const IconButton(
            icon: Icon(Icons.menu),
            tooltip: 'Navigation menu',
            onPressed: null, // Disabilitiamo il button
          ),

          // Expanded fa sì che il figlio occupi tutto lo spazio disponibile
          Expanded(
            child: title,
          ),

          const IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
    );
  }
}

class MyScaffold extends StatelessWidget {
  const MyScaffold({super.key});

  @override
  Widget build(BuildContext context) {
    // Possiamo pensare a Material come una vista virtuale
    // in cui i nostri widget verranno renderizzati
    return Material(
      // Con Column renderizziamo i figli in verticale, dall'alto verso il basso
      child: Column(
        // Column ha due figli, MyAppBar e un Expanded
        children: [
          // Il widget che rappresenta la barra in alto
          MyAppBar(
            title: Text(
              'Example title',
              style: Theme.of(context) // lo stile del testo nella barra
                  .primaryTextTheme
                  .titleLarge,
            ),
          ),

          // Expanded qui ha un figlio Center che a sua volta contiene un Text
          const Expanded(
            child: Center(
              child: Text('Hello, world!'),
            ),
          ),
        ],
      ),
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      // questo titolo apparirà nello switcher della piattaforma target
      // es, quando accediamo a tutte le app attive in Android
      title: 'My app',

      // Equivalente a React Native, permette di evitare che la UI del
      // sistema possa sovrapporsi ai widget dell'app (es, evitiamo il notch)
      home: SafeArea(
        child: MyScaffold(),
      ),
    ),
  );
}
