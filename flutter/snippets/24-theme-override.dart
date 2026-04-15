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
              padding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 12,
              ),
              color: Theme.of(context).colorScheme.primary,
              child: Text(
                'Testo con colore di sfondo',
                style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                      color: Theme.of(context).colorScheme.onPrimary,
                    ),
              ),
            ),
            floatingActionButton: Theme(
              data: Theme.of(context).copyWith(
                colorScheme: ColorScheme.fromSeed(
                  seedColor: Colors.pink,
                ),
              ),
              child: FloatingActionButton(
                onPressed: () {},
                child: const Icon(Icons.add),
              ),
            )));
  }
}
