import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(title: 'Aggiungi alla lista', home: MyHomePage());
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  // datasource
  final List<String> _items = ['Pippo'];

  void _addItem() {
    // setState modifica lo stato corrente del widget
    // prende in input una funzione anonima
    // che si occupa di implementare la logica
    // della modifica dello stato
    setState(() {
      int nextNum = _items.length + 1;
      _items.add('Pluto $nextNum');
    });
    // quando setState termina, Flutter viene
    // notificato del fatto che c'è stato un cambiamento
    // questo triggera un nuovo rendering
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('La mia lista')),
      // il costruttore builder accetta
      // due parametri:
      // - itemCount: quanti valori ho dentro il
      //              datasource su cui costruirò
      //              la lista
      // - itemBuilder: è una funzione anonima
      //    che accetta due parametri, context
      //    e index; context serve a rifersi
      //    ai widget padri;
      //    index indica l'i-esimo valore
      //    della lista (partendo da 0)
      //    itemBuilder viene invocato per ogni
      //    valore del datasource
      body: ListView.builder(
        itemCount: _items.length,
        // itemBuilder dice come deve essere
        // il widget che rappresenta un singolo
        // item della ListView
        itemBuilder: (context, index) {
          return ListTile(title: Text(_items[index]));
        },
      ),
      floatingActionButton: FloatingActionButton(
        // se premuto, invoca _addItem
        onPressed: _addItem,
        tooltip: 'Tocca per aggiungere',
        child: Icon(Icons.add),
      ),
    );
  }
}
