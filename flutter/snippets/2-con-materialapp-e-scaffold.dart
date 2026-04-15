import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'La mia app',
      // Scaffold permette di assorbire il Material Design
      // e applicarlo automaticamente ai widget nella pagina
      home: const Scaffold(body: const Center(child: Text("Hello"))),
    );
  }
}
