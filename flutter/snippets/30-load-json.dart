import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Load JSON from Assets'),
        ),
        body: const JsonLoader(),
      ),
    );
  }
}

class JsonLoader extends StatefulWidget {
  const JsonLoader({super.key});

  @override
  _JsonLoaderState createState() => _JsonLoaderState();
}

class _JsonLoaderState extends State<JsonLoader> {
  late Future<dynamic> _jsonData;

  @override
  void initState() {
    super.initState();
    _jsonData = loadJsonData();
  }

  Future<dynamic> loadJsonData() async {
    String jsonString = await rootBundle.loadString('assets/data.json');
    // Qui interpretiamo il JSON
    return json.decode(jsonString);
  }

  @override
  Widget build(BuildContext context) {
    // FutureBuilder si usa quando abbiamo un valore Future
    // che vogliamo usare per costruire il widget
    return FutureBuilder<dynamic>(
      future: _jsonData,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          if (snapshot.hasError) {
            return Text('Errore: ${snapshot.error}');
          }

          // In questo caso, il nostro JSON è un array
          // di elementi con due campi, name e description
          return ListView.builder(
            itemCount: (snapshot.data as List).length,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(snapshot.data[index]['name']),
                subtitle: Text(snapshot.data[index]['description']),
              );
            },
          );
        }

        // Show a loading spinner while waiting for the data
        return const CircularProgressIndicator();
      },
    );
  }
}
