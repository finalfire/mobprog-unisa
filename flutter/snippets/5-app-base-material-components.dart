import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    // Si usa sempre Scaffold per definire il layout
    // nel caso in cui usiamo Material Components
    return Scaffold(
      // appBar accetta un oggetto AppBar che indica come è fatta
      // l'application bar (generalmente nella parte superiore dello schermo)
      appBar: AppBar(
        // leading è la parte sinistra dell'AppBar
        leading: const IconButton(
          // Icons mette a disposizione già una serie di icone generiche
          icon: Icon(Icons.menu),
          tooltip: 'Menu',
          onPressed: null,
        ),
        // title è il testo dell'AppBar
        title: const Text('Example title'),
        // actions accetta un array di widget (di solito IconButton)
        // indicanti le funzionalità mostrate nella parte destra dell'AppBar
        actions: const [
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Cerca',
            onPressed: null,
          ),
        ],
      ),

      // body è la parte centrale dello schermo
      body: const Center(
        child: Text('Hello, world!'),
      ),

      // floatingActionButton è tipico di Android e permette di specificare un
      // FloatingActionButton (qui il pulsantino in basso a destra con +)
      floatingActionButton: const FloatingActionButton(
        tooltip: 'Add', // used by assistive technologies
        onPressed: null,
        child: Icon(Icons.add),
      ),
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      title: 'Material Components App',
      home: Home(),
    ),
  );
}
