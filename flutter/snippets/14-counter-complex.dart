import 'package:flutter/material.dart';

class CounterDisplay extends StatelessWidget {
  // Questo Widget si occupa della presentazione
  // del valore dello stato, tramite un Text.
  // Il valore dello stato non è contenuto
  // in questo StatelessWidget ma viene ricevuto
  // come parametro (count)
  const CounterDisplay({required this.count, super.key});

  final int count;

  @override
  Widget build(BuildContext context) {
    return Text('Conteggio: $count');
  }
}

class CounterIncrementor extends StatelessWidget {
  // Questo Widget si occupa di fornire il
  // componente di UI per modificare lo stato.
  // Nota come non effettua la modifica dello stato in sé,
  // ma riceve una VoidCallback (una funzione anonima che non restituisce
  // alcunché) che si occuperà di modificare lo stato.
  // Questa funzione è parte di uno StatefulWidget (Counter) che contiene
  // lo stato e si occupa della sua modifica.
  const CounterIncrementor({required this.onPressed, super.key});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      // Qui colleghiamo la VoidCallback
      onPressed: onPressed,
      child: const Text('Aggiungi'),
    );
  }
}

class Counter extends StatefulWidget {
  // Lo StatefulWidget che mantiene lo stato.
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  // La classe rappresentante lo State vero e proprio
  int _counter = 0;

  void _increment() {
    setState(() {
      ++_counter;
    });
  }

  // Il metodo build qui si occupa di definire
  // la struttura di presentazione di tutto il widget
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        CounterIncrementor(onPressed: _increment),
        const SizedBox(width: 16),
        CounterDisplay(count: _counter),
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
