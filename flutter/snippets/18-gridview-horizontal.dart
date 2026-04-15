import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Grid List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: GridView.count(
          crossAxisCount: 2,
          scrollDirection: Axis.horizontal,
          children: List.generate(100, (index) {
            return Center(
              child: Text('Item $index'),
            );
          }),
        ),
      ),
    );
  }
}
