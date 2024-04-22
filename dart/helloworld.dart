void cambia(int x) {
  x = 42;
}

// questo è un commento
// main è l'entrypoint del programma
void main() {
  var x = 10;
  cambia(x);
  print(x); // 10

  var a = [1, 2, 3];
  a.add(87);
  print(a);

  var tupla = (primo: 2, 43, x: 'Ciao', 1, 8);
  print(tupla);
  // Con l'operatore $ accedo agli elementi senza nome,
  // saltando quelli con nome
  // In pratica, $ opera sulla tupla fatta solo dagli
  // elementi senza nome => [43,1,8]
  print(tupla.$1); // il secondo elemento della tupla
  print(tupla.$3); // stampa 8
  print(tupla.primo); // il primo elemento della tupla
}
