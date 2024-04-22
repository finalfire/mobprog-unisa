// per un named parameter, la sintassi x = y
// indica che il parametro x avrà valore di default pari a y
int somma({int a = 1, int b = 2}) {
  return a + b;
}

void main(List<String> args) {
  print(somma(a: 10, b: 100)); // 110
  print(somma()); // 3

  // args[0] è il primo parametro passato alla
  // esecuzione del programma
  // es, dart provavalori.dart ciao
  print(args[0]);
}
