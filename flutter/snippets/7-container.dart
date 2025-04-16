import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Container(
            width: 136.0,
            height: 42.0,
            margin: const EdgeInsets.all(20.0),
            color: Colors.orange,
            child: Center(child: Text("Hello, World!"))));
  }
}

void main() {
  runApp(
    const MaterialApp(
      title: 'Material Components App',
      home: Scaffold(body: Home()),
    ),
  );
}
