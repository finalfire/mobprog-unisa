import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Stack(children: [
      Container(width: 100, height: 100, color: Colors.yellow),
      Container(width: 50, height: 50, color: Colors.blue),
      Positioned(right: 0, bottom: 0, child: Text("Hello"))
    ]));
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
