import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(
    title: 'Navigation Basics',
    home: RouteA(),
  ));
}

class RouteA extends StatelessWidget {
  const RouteA({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Route A'),
      ),
      body: Center(
        child: ElevatedButton(
          child: const Text('Vai alla Route B'),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const RouteB()),
            );
          },
        ),
      ),
    );
  }
}

class RouteB extends StatelessWidget {
  const RouteB({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Route B'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Torna indietro!'),
        ),
      ),
    );
  }
}
