import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  DatabaseHelper._privateConstructor();
  static final DatabaseHelper instance = DatabaseHelper._privateConstructor();

  static Database? _database;
  Future<Database> get database async => _database ??= await _initDatabase();

  Future<Database> _initDatabase() async {
    return openDatabase(
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
    final db = await database;
    await db.insert(
      'utenti',
      utente.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  // Tutti gli altri metodi
  // ...
}
