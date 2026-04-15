import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Example AppBar'),
        backgroundColor: Colors.teal,
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {
              print('Search button tapped!');
            },
          ),
          IconButton(
            icon: Icon(Icons.notifications),
            onPressed: () {
              print('Notifications button tapped!');
            },
          ),
        ],
      ),
      body: Center(
        child: Text('Hello, this is the home screen!'),
      ),
    );
  }
}
