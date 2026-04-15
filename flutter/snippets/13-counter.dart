import 'package:flutter/material.dart';

class Counter extends StatefulWidget {
  // Questa classe rappresenta la configurazione dello stato.
  // Memorizza il valore fornito dal genitore (nessuno in questo caso)
  // utilizzato dal metodo build della classe State.
  // Anche in uno StatefulWidget, i campi sono sempre final.

  // Costruttore
  // key è un identificativo speciale che viene utilizzato nei Widget
  // ed è utilizzato per controllare la posizione del Widget nel widget tree.
  const Counter({super.key});

  // createState() permette di collegare lo StatefulWidget al suo State
  // associato. In questo caso, lo stato è di tipo State<Counter>, e
  // lo inizializziamo con una istanza di _CounterState()
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  // Valore dello stato
  int _counter = 0;

  void _increment() {
    setState(() {
      // Questa invocazione a setState riferisce a
      // Flutter che c'è stato un cambiamento nello State;
      // questo fa sì che il metodo build venga reinvocato
      // così che il rendering possa riportare il valore dello stato
      // aggiornato. Se cambiamo solo il valore, senza passare tramite setState,
      // il metodo build non verrà invocato e il rendering non cambierà.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // build() viene reinvocato ogni volta che si chiama setState.
    // Il metodo build è ottimizzato affinché tutto ciò
    // che contiene venga renderizzato in modo efficiente
    // (in tempo al più lineare nel numero dei widget contenuti).

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        ElevatedButton(
          onPressed: _increment,
          child: const Text('Aggiungi'),
        ),
        const SizedBox(width: 16),
        Text('Conteggio: $_counter'),
      ],
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Counter(),
        ),
      ),
    ),
  );
}
