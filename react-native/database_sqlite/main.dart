import 'package:flutter/material.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import 'utente.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  Database? database;

  @override
  void initState() {
    super.initState();
    initializeDb();
  }

  Future<void> initializeDb() async {
    database = await openDatabase(
      join(await getDatabasesPath(), 'mio_database.db'),
      onCreate: (db, version) {
        return db.execute(
          'CREATE TABLE utenti(matricola INTEGER PRIMARY KEY, nome TEXT, eta INTEGER, ruolo TEXT)',
        );
      },
      version: 1,
    );
  }

  Future<void> insertUtente(Utente utente) async {
    await database!.insert(
      'utenti',
      utente.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  void insertDummyUtente(BuildContext context) {
    Utente newUtente = Utente(
        matricola: 0, nome: "Pluto", eta: 25, ruolo: "Software Engineer");
    insertUtente(newUtente).then((_) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Utente Pluto inserito con successo!')));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SQLite Example'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () => insertDummyUtente(context),
          child: const Text('Inserisci Pluto'),
        ),
      ),
    );
  }
}
