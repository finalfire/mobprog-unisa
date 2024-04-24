import 'dart:convert';
import 'dart:io';

class Histogram {
  // questa mappa tiene di conto di un simbolo e di quante volte appare
  Map<String, int> char2freq = {};
  // quanti simboli ho letto
  int n = 0;

  // fa il parsing della linea letta, prende ogni singolo carattere
  // e aggiorna il suo valore nella map char2freq
  void parseLine(String line) {
    // rimuovere tutti gli spazi da line -> usiamo una espressione regolare
    // .replaceAll(x, '') -> sostituisci le sottostringhe x con il simbolo vuoto
    // RegExp -> un oggetto rappresentante una espressione regolare
    // r'\s' -> è una espressione regolare che indica
    //          "cattura tutti i simboli della famiglia spazio"
    //          (spazi, tabulazioni, fine riga)
    var lineNoSpazi = line.replaceAll(RegExp(r'\s'), '');

    // iteriamo su ogni simbolo, trasformato nella sua versione maiuscola,
    // nella stringa
    // s.split('') => crea una lista di simboli a partire dalla stringa s
    for (var char in lineNoSpazi.toUpperCase().split('')) {
      // la riga seguente aggiorna il conteggio del carattere se è presente nella
      // mappa, altrimenti lo aggiunge con valore 1
      // .update(k, f(value), { ifAbsent: g(default)? })
      // k è la chiave che io sto cercando nella mappa
      // f(value) => funzione anonima che aggiorna il valore di k nella mappa
      //             questa funzione è valida solo se k è presente nella mappa,
      //             se sì, allora value è il valore corrente di k nella mappa
      // g(default) => funzione anonima che inserisce k nella mappa con valore
      //               pari a default
      char2freq.update(
          char, // char è la chiave k
          (value) =>
              value + 1, // questa funzione viene invocata se k è nella mappa
          ifAbsent: () => 1 // invece è invocata se k non è nella mappa
          );
      // aggiorno il numero totale di simboli letti
      n += 1;
    }
  }

  // coppia è un Record costituto da una Stringa e un double
  // crea la stringa fatta da tanti # quante volte in percentuale
  // appare il simbolo in coppia.$1
  String _createBar((String, double) coppia) {
    // coppia.$1 è il simbolo, coppia.$2 è la frequenza di apparizione nel testo
    // in percentuale
    // con ${} inserisco il valore di una espressione all'interno di una stringa
    // s * n => restituisce una stringa contenente s ripetuto n volte
    //          'ciao' * 2 => 'ciaociao'
    return '${coppia.$1}: ${'#' * coppia.$2.round()} ${coppia.$2}';
  }

  // facciamo un override del metodo toString, questo verrà invocato
  // quando faremo un print dell'istanza; per dichiarare che sto facendo
  // l'override di un metodo, uso l'annotazione @override
  // var h = Histogram(); print(h)
  @override
  String toString() {
    // creo e restituisco la rappresentazione in String di questa istanza
    // (1) accedo a tutti gli elementi (entry) della mappa => (key, value)
    // colleziono tutti gli elementi della mappa in una lista,
    // avrò una lista di coppie (key,value)
    var elementi = char2freq.entries.toList();

    // (2) ordino gli elementi in modo decrescente per il loro value;
    // in caso di value uguali, ordino per la key
    // lista.sort() modifica direttamente la lista
    elementi.sort((a, b) => a.value == b.value
            ? b.key.compareTo(a.key) // b.key <= a.key
            : b.value.compareTo(a.value) // b.value <= a.value
        );

    // (3) andiamo a calcolare i valori in percentuale per ogni simbolo
    // lista.map(f) => invoca la funzione f per ogni elemento della lista
    //                 e restituisce un nuovo valore
    // il comportamento di map è detto "lazy" => indica che i valori
    // della computazione saranno concretizzati solo quando ne avremo bisogno
    // (es, quando vado ad accederci)
    var valoriPercentuali = elementi
        .map((coppia) => (coppia.key, coppia.value / n * 100))
        .where((coppia) => coppia.$2 >= 1.0)
        .toList();

    var rappresentazione = valoriPercentuali.map(_createBar).join('\n');
    return rappresentazione;
  }
}

// step 1. creare una istanza di Histrogram
// step 2. andare a leggere da stdin il testo e splittarlo per linea
// step 3. per ogni linea, usare il metodo parseLine della istanza di Histrogram
// step 4. fare una stampa di Histogram
void main() {
  var h = Histogram(); // istanza della classe Histogram

  stdin // stdin è uno stream collegato a stdin
      .transform(utf8
          .decoder) // transform indica una operazione sullo stream; interpreta i caratteri che leggi secondo utf8
      .transform(LineSplitter()) // splitta l'intero testo per linea
      .listen((lineaDiTesto) {
    // listen invoca una funzione quando ho una linea
    h.parseLine(lineaDiTesto);
  },
          onDone: () => print(
              h)); // onDone è la funzione invocata quando termino la lettura
}
