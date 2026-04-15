import 'package:flutter/material.dart';

class MyWidget extends StatelessWidget {
  const MyWidget({required this.text, required this.buttonText, super.key});

  final String text;
  final String buttonText;

  @override
  Widget build(BuildContext context) {
    return Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
      Text(text),
      TextButton(
          child: Text(buttonText),
          onPressed: () {
            print("Cancellato");
          })
    ]);
  }
}

void main() {
  runApp(
    const MaterialApp(
      title: 'La mia app',
      home: SafeArea(
        child: Material(
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                MyWidget(text: 'Il mio testo', buttonText: 'Cancella'),
                MyWidget(text: 'Un altro testo', buttonText: 'Non cancellare'),
                MyWidget(text: 'Testo a random', buttonText: 'Forse cancella'),
              ]),
        ),
      ),
    ),
  );
}
