import 'package:flutter/material.dart';
import 'database_helper.dart';
import 'utente.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: UtentiScreen(),
    );
  }
}

class UtentiScreen extends StatefulWidget {
  const UtentiScreen({super.key});

  @override
  State<UtentiScreen> createState() => _UtentiScreenState();
}

class _UtentiScreenState extends State<UtentiScreen> {
  final TextEditingController _matricolaController = TextEditingController();
  final TextEditingController _nomeController = TextEditingController();
  final TextEditingController _etaController = TextEditingController();
  final TextEditingController _ruoloController = TextEditingController();
  List<Utente> _utenti = [];

  @override
  void initState() {
    super.initState();
    _fetchUtenti();
  }

  Future<void> _fetchUtenti() async {
    final db = DatabaseHelper.instance;
    final List<Map<String, dynamic>> maps =
        await db.database.then((db) => db.query('utenti'));

    setState(() {
      _utenti = List.generate(maps.length, (i) {
        final matricola = maps[i]['matricola'];
        final nome = maps[i]['nome'];
        final eta = maps[i]['eta'];
        final ruolo = maps[i]['ruolo'];
        return Utente(
            matricola: matricola as int,
            nome: nome as String,
            eta: eta as int,
            ruolo: ruolo as String);
      });
    });
  }

  Future<void> _addUtente() async {
    final matricola = int.parse(_matricolaController.text);
    final nome = _nomeController.text;
    final eta = int.parse(_etaController.text);
    final ruolo = _ruoloController.text;

    final utente =
        Utente(matricola: matricola, nome: nome, eta: eta, ruolo: ruolo);
    await DatabaseHelper.instance.insertUtente(utente);
    _fetchUtenti();

    _matricolaController.clear();
    _nomeController.clear();
    _etaController.clear();
    _ruoloController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Utenti'),
      ),
      body: Column(
        children: [
          TextField(
            controller: _matricolaController,
            decoration: InputDecoration(labelText: 'Matricola'),
          ),
          TextField(
            controller: _nomeController,
            decoration: InputDecoration(labelText: 'Nome'),
          ),
          TextField(
            controller: _etaController,
            decoration: InputDecoration(labelText: 'Età'),
            keyboardType: TextInputType.number,
          ),
          TextField(
            controller: _ruoloController,
            decoration: InputDecoration(labelText: 'Ruolo'),
          ),
          ElevatedButton(
            onPressed: _addUtente,
            child: Text('Aggiungi Utente'),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _utenti.length,
              itemBuilder: (context, index) {
                final utente = _utenti[index];
                return ListTile(
                  title: Text(utente.nome),
                  subtitle: Text(
                      'matricola ${utente.matricola}, ${utente.eta} anni, ${utente.ruolo}'),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
