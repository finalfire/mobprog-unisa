import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Aggiungi alla lista',
        home: Scaffold(
            body: Container(
          margin: const EdgeInsets.all(8.0),
          padding: const EdgeInsets.symmetric(
            horizontal: 12,
            vertical: 24,
          ),
          color: Colors.red,
          child: Text(
            'Questo testo è in grassetto',
            style: TextStyle(
                fontWeight: FontWeight.bold, backgroundColor: Colors.amber),
          ),
        )));
  }
}
