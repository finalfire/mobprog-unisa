void main() {
  var tupla = (42, secondoInt: 24, 'Hello');

  print(tupla.$1);
  print(tupla.secondoInt);
  print(tupla.$2);

  var f = 42;
  print('Ciao, f = ${f + 27}');
}
