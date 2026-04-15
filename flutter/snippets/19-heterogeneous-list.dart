import 'package:flutter/material.dart';

void main() {
  runApp(
    MyApp(
      items: List<ListItem>.generate(
        1000,
        (i) => i % 6 == 0
            ? DateItem('Data: $i')
            : MessageItem('User: $i', 'Testo del messaggio: $i'),
      ),
    ),
  );
}

class MyApp extends StatelessWidget {
  final List<ListItem> items;

  const MyApp({super.key, required this.items});

  @override
  Widget build(BuildContext context) {
    const title = 'Lista Eterogenea';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: ListView.builder(
          // Let the ListView know how many items it needs to build.
          itemCount: items.length,
          // Provide a builder function. This is where the magic happens.
          // Convert each item into a widget based on the type of item it is.
          itemBuilder: (context, index) {
            final item = items[index];

            return ListTile(
              title: item.buildTopPart(context),
              subtitle: item.buildBottomPart(context),
            );
          },
        ),
      ),
    );
  }
}

abstract class ListItem {
  Widget buildTopPart(BuildContext context);
  Widget buildBottomPart(BuildContext context);
}

class DateItem implements ListItem {
  final String date;

  DateItem(this.date);

  @override
  Widget buildTopPart(BuildContext context) {
    return Text(
      date,
      style: Theme.of(context).textTheme.headlineSmall,
    );
  }

  @override
  Widget buildBottomPart(BuildContext context) => const SizedBox.shrink();
}

class MessageItem implements ListItem {
  final String user;
  final String body;

  MessageItem(this.user, this.body);

  @override
  Widget buildTopPart(BuildContext context) => Text(user);

  @override
  Widget buildBottomPart(BuildContext context) => Text(body);
}
