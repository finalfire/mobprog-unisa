import 'dart:async';
import 'utente.dart';

import 'package:flutter/widgets.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

void main() async {
  // Serve ad evitare errori di inizializzazione
  // per i widget
  WidgetsFlutterBinding.ensureInitialized();

  // Apriamo il database e salviamo un riferimento ad esso
  // nella variabile database
  final database = openDatabase(
    // Definiamo il path del database; join è della libreria path,
    // è utile a definire correttamente il path (es, si occupa
    // di inserire ad esempio il path divider /)
    join(await getDatabasesPath(), 'mio_database.db'),
    // Quando il db viene creato, inseriamo la tabella
    onCreate: (db, version) {
      return db.execute(
        'CREATE TABLE utenti(matricola INTEGER PRIMARY KEY, nome TEXT, eta INTEGER, ruolo TEXT)',
      );
    },
    // La versione è utile nel caso in cui vogliamo fare
    // upgrade/downgrade del database
    version: 1,
  );

  // Definizione della funzione per inserire un utente
  Future<void> insertUtente(Utente utente) async {
    // Riferimento al databse
    final db = await database;

    // Inseriamo l'utente nella tabella; conclictAlgorithm specifica
    // cosa fare nel caso di un inserimento ripetuto; in questo caso,
    // lo rimpiazza col nuovo
    await db.insert(
      'utenti',
      utente.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  // Definizione della funzione per recuperare tutti gli utenti
  Future<List<Utente>> utenti() async {
    final db = await database;

    // Query della tabella per tutti gli utenti
    final List<Map<String, Object?>> utentiMaps = await db.query('utenti');

    // Ogni elemnto della lista è una mappa, convertiamo
    // ognuno di esso in un Utente; possiamo anche implementare un metodo
    // in Utente per farlo (es, Utente.fromMap(mappa))
    return [
      for (final {
            'matricola': matricola as int,
            'nome': nome as String,
            'eta': eta as int,
            'ruolo': ruolo as String,
          } in utentiMaps)
        Utente(matricola: matricola, nome: nome, eta: eta, ruolo: ruolo),
    ];
  }

  Future<void> aggiornaUtente(Utente utente) async {
    final db = await database;

    // Aggiorniamo l'utente data la sua matricola
    await db.update(
      'utenti',
      utente.toMap(),
      // Usiamo la matricola come chiave per dire
      // quale utente vogliamo aggiornare
      where: 'matricola = ?',
      // Passiamo qui la matricola per evitare SQL injection
      whereArgs: [utente.matricola],
    );
  }

  Future<void> cancellaUtente(int matricola) async {
    final db = await database;

    // Cancella l'utente data la matricola
    await db.delete(
      'utenti',
      where: 'matricola = ?',
      whereArgs: [matricola],
    );
  }

  // Creiamo un utente e lo inseriamo
  var pippo =
      const Utente(matricola: 0, nome: 'Pippo', eta: 35, ruolo: 'Manager');

  await insertUtente(pippo);
  print(await utenti());

  pippo = Utente(
      matricola: pippo.matricola,
      nome: pippo.nome,
      eta: pippo.eta + 1,
      ruolo: pippo.ruolo);
  await aggiornaUtente(pippo);

  print(await utenti());
  await cancellaUtente(pippo.matricola);

  print(await utenti());
}
