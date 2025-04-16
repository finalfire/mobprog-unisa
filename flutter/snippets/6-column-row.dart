import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: const Center(
        child: const Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("Hello, prima riga"),
              const Text("Hello, seconda riga"),
              const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text("Terza riga, sinistra"),
                    const Text("Terza riga, destra")
                  ])
            ]),
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
