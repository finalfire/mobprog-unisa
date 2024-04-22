import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      ElevatedButton(onPressed: () {}, child: const Text("Toccami!")),
      SizedBox(height: 12),
      ElevatedButton(onPressed: null, child: const Text("Disabilitato")),
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
