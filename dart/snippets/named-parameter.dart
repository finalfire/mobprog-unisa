// altro è un named parameter; è detto named
// perché all'invocazione della funzione, il suo
// valore effettivo lo indico tramite il nome del
// parametro stesso
// opt è un parametro che potrei anche non passare (opzionale)
// per indicare questo uso il ?
// ciao è un named parameter con valore di default pari a 5
// se non passiamo ciao, avrò sempre e comunque il suo valore pari a 5
int sommaTre(int a, int b, {required int altro, int ciao = 5, int? opt}) {
  if (opt == null) {
    return a + b + altro + ciao;
  }
  return a + b + altro + ciao + opt;
}

void main() {
  int risultato = sommaTre(10, 20, ciao: 20, altro: 12);
  print(risultato);
}
