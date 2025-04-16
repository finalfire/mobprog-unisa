import 'dart:convert';
import 'dart:io';

// Questa classe rappresenta il nostro istrogramma
class Histogram {
  // Mappa carattere -> frequenza
  Map<String, int> char2freq = {};
  // Caratteri totali letti
  int n = 0;

  // Parserizza una stringa proveniente da standard input
  void parseLine(String line) {
    // Rimuoviamo tutti gli spazi tramite un'espressione regolare
    var cleanLine = line.replaceAll(RegExp(r'\s'), '');

    // Rendiamo i caratteri nella stringa maiuscoli e iteriamo su essi
    for (final char in cleanLine.toUpperCase().split('')) {
      // Map.update() aggiorna il valore relativo alla chiave scelta
      // la prima funzione aggiorna il valore basandosi su quello corrente
      // se la chiave non esiste, aggiunge un nuovo valore tramite la funzione ifAbsent
      char2freq.update(char, (value) => value + 1, ifAbsent: () => 1);
      n += 1;
    }
  }

  // Metodo privato, serve a creare la stringa rappresentante una barra
  // dell'istogramma
  String _createBar((String, double) pair) {
    return '${pair.$1}: ${"#" * pair.$2.round()} ${pair.$2.toStringAsFixed(2)}';
  }

  // Override del metodo .toString(), che verrà invocato quando
  // proveremo a fare un print() dell'istanza di Histogram
  @override
  String toString() {
    // Map.entries() restituisce un iteratore sugli
    // elementi (chiave, valore) della mappa
    var entries = char2freq.entries.toList();

    // Il sort ha lo stesso behavior come in Java e JS
    entries.sort((a, b) => a.value == b.value
        ? b.key.compareTo(a.key)
        : b.value.compareTo(a.value));

    // map modifica i valori delle frequenze in percentuali
    // il where è l'equivalente del filter, e mantiene solo quegli elementi con
    // percentuale maggiore o uguale a 1
    var finalValues = entries
        .map((entry) => (entry.key, entry.value / n * 100))
        .where((pair) => pair.$2 >= 1)
        .toList();

    // map applica la funzione _createBar ad ogni elemento
    // di finalValues, così da creare una String per ognuno di essi
    return finalValues.map(_createBar).join('\n');
  }
}

void main() {
  var h = Histogram();

  // stdin è lo stream per lo standard input
  // la prima trasformazione dello stream riguarda la codifica (in utf8)
  // la seconda splitta per ogni linea
  // listen() "abbona" un listener allo stream
  // - quando arriva un evento line, che è una String, la parserizziamo
  // - onDone viene invocata quando lo stream termina (es, EOF)
  stdin.transform(utf8.decoder).transform(const LineSplitter()).listen((line) {
    h.parseLine(line);
  }, onDone: () => print(h));
}
