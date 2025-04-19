// la funzione hello prende in input tre valori
// (1) nome -- parametro obbligatorio
// (2) età -- parametro posizionale opzionale
// (3) professione -- parametro posizionale opzionale
// stampa (1) se gli altri non sono presenti
String hello(String nome, [int? eta = 27, String? professione]) {
  var s = 'Ciao, ${nome}!';
  if (eta != null) {
    s += '\nHai ${eta} anni!';
  }
  if (professione != null) {
    s += '\nE fai il ${professione}';
  }
  return s;
}

void main() {
  print(hello('Fra', 'Studente'));
}
