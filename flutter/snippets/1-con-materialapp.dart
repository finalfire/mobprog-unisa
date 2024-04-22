import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Il testo si vede in modo differente
    return MaterialApp(
      title: 'La mia app',
      home: const Center(child: Text("Hello, world!")),
    );
  }
}
