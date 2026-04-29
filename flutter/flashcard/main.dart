import 'package:flutter/material.dart';

void main() {
  runApp(const FlashcardApp());
}

class CardModel {
  final String id;
  final String front;
  final String back;

  const CardModel({required this.id, required this.front, required this.back});
}

class Deck {
  final String id;
  final String emoji;
  final String name;
  final List<CardModel> cards;

  const Deck({
    required this.id,
    required this.emoji,
    required this.name,
    required this.cards,
  });
}

class Session {
  final String deck;
  final int correct;
  final int total;

  const Session({
    required this.deck,
    required this.correct,
    required this.total,
  });
}

const List<Deck> decks = [
  Deck(
    id: '1',
    emoji: '⚛️',
    name: 'React Native',
    cards: [
      CardModel(
        id: 'c1',
        front: "Cos'è JSX?",
        back:
            "Estensione sintattica di JS che permette di scrivere UI dichiarativa simile all'HTML",
      ),
      CardModel(
        id: 'c2',
        front: "Cos'è lo State?",
        back:
            "Dati locali di un componente che, quando cambiano, causano un re-render",
      ),
      CardModel(
        id: 'c3',
        front: "Cos'è una Prop?",
        back:
            "Parametro passato da un componente padre al figlio, accessibile in sola lettura",
      ),
      CardModel(
        id: 'c4',
        front: "FlatList vs ScrollView",
        back:
            "FlatList usa lazy rendering ed è ottimizzata per liste lunghe; ScrollView renderizza tutto subito",
      ),
      CardModel(
        id: 'c5',
        front: "useEffect serve a?",
        back:
            "Eseguire side effects (fetch, timer, subscription) dopo il render del componente",
      ),
      CardModel(
        id: 'c6',
        front: "useState restituisce?",
        back:
            "Un array con il valore corrente dello state e una funzione per aggiornarlo",
      ),
      CardModel(
        id: 'c7',
        front: "SafeAreaView serve a?",
        back:
            "Evitare che il contenuto finisca sotto le aree di sistema (notch, barra di stato)",
      ),
      CardModel(
        id: 'c8',
        front: "StyleSheet.create serve a?",
        back: "Ottimizzare gli stili inviandoli al native layer una sola volta",
      ),
      CardModel(
        id: 'c9',
        front: "Cos'è il Bridge?",
        back:
            "Il meccanismo che permette la comunicazione tra JS thread e native thread",
      ),
      CardModel(
        id: 'c10',
        front: "TouchableOpacity vs Pressable",
        back:
            "Pressable è più flessibile e moderno; TouchableOpacity gestisce solo l'opacità al tap",
      ),
    ],
  ),
  Deck(
    id: '2',
    emoji: '🟨',
    name: 'JavaScript',
    cards: [
      CardModel(
        id: 'c1',
        front: "var vs let vs const",
        back:
            "var è function-scoped; let e const sono block-scoped; const non può essere riassegnata",
      ),
      CardModel(
        id: 'c2',
        front: "Cos'è una Promise?",
        back:
            "Oggetto che rappresenta il risultato futuro (o fallimento) di un'operazione asincrona",
      ),
      CardModel(
        id: 'c3',
        front: "Cosa fa async/await?",
        back:
            "Permette di scrivere codice asincrono in modo sincrono, semplificando la gestione delle Promise",
      ),
      CardModel(
        id: 'c4',
        front: "Cos'è il closure?",
        back:
            "Una funzione che ricorda le variabili del suo scope esterno anche dopo che quello scope è terminato",
      ),
      CardModel(
        id: 'c5',
        front: "== vs ===",
        back:
            "== confronta il valore con coercizione di tipo; === confronta valore E tipo (preferibile)",
      ),
      CardModel(
        id: 'c6',
        front: "Cos'è l'hoisting?",
        back:
            "Meccanismo per cui le dichiarazioni di variabili e funzioni vengono spostate in cima allo scope",
      ),
      CardModel(
        id: 'c7',
        front: "map() fa?",
        back:
            "Crea un nuovo array applicando una funzione a ogni elemento, senza modificare l'originale",
      ),
      CardModel(
        id: 'c8',
        front: "filter() fa?",
        back:
            "Restituisce un nuovo array con solo gli elementi che soddisfano una condizione booleana",
      ),
      CardModel(
        id: 'c9',
        front: "reduce() fa?",
        back:
            "Riduce un array a un singolo valore accumulando i risultati con una funzione",
      ),
      CardModel(
        id: 'c10',
        front: "Cos'è il prototype?",
        back:
            "Oggetto da cui gli altri oggetti ereditano proprietà e metodi in JavaScript",
      ),
    ],
  ),
];

const Color kBackground = Color(0xFFF9F9F7);
const Color kSurface = Color(0xFFFFFFFF);
const Color kPrimary = Color(0xFF1A1A2E);
const Color kAccent = Color(0xFF4F46E5);
const Color kSuccess = Color(0xFF22C55E);
const Color kDanger = Color(0xFFEF4444);
const Color kTextMuted = Color(0xFF9CA3AF);
const Color kBorder = Color(0xFFE5E7EB);

class FlashcardApp extends StatelessWidget {
  const FlashcardApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flashcard',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: kBackground,
        colorScheme: ColorScheme.light(primary: kAccent),
        appBarTheme: const AppBarTheme(
          backgroundColor: kBackground,
          foregroundColor: kPrimary,
          elevation: 0,
          shadowColor: Colors.transparent,
          titleTextStyle: TextStyle(
            color: kPrimary,
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      home: const MainScreen(),
    );
  }
}

// StatefulWidget perché gestisce lo stato condiviso: la lista delle sessioni.
// Equivalente di useState<Session[]>([]) in App.tsx
class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  // Stato globale: lista delle sessioni completate
  // Equivalente di: const [sessions, setSessions] = useState<Session[]>([])
  final List<Session> _sessions = [];

  // Indice della tab attiva
  int _currentTab = 0;

  // Callback passata in giù come prop — equivalente di onSessionComplete
  void _onSessionComplete(Session session) {
    setState(() {
      _sessions.add(session);
    });
  }

  @override
  Widget build(BuildContext context) {
    // Le due tab — equivalente dei due Tab.Screen
    final List<Widget> tabs = [
      HomeScreen(onSessionComplete: _onSessionComplete),
      StatsScreen(sessions: _sessions),
    ];

    return Scaffold(
      body: tabs[_currentTab],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentTab,
        onTap: (i) => setState(() => _currentTab = i),
        backgroundColor: kSurface,
        selectedItemColor: kAccent,
        unselectedItemColor: kTextMuted,
        selectedLabelStyle: const TextStyle(
          fontWeight: FontWeight.w600,
          fontSize: 12,
        ),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.layers), label: 'Mazzi'),
          BottomNavigationBarItem(
            icon: Icon(Icons.bar_chart),
            label: 'Statistiche',
          ),
        ],
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  // Prop: callback per notificare il completamento di una sessione
  final void Function(Session) onSessionComplete;

  const HomeScreen({super.key, required this.onSessionComplete});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.fromLTRB(24, 24, 24, 4),
              child: Text(
                'Flashcard',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w700,
                  color: kPrimary,
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.fromLTRB(24, 0, 24, 20),
              child: Text(
                'Scegli un mazzo per iniziare',
                style: TextStyle(fontSize: 14, color: kTextMuted),
              ),
            ),

            // ListView.builder = equivalente di FlatList
            Expanded(
              child: ListView.separated(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                itemCount: decks.length,
                separatorBuilder: (_, __) => const SizedBox(height: 12),
                itemBuilder: (context, i) {
                  final deck = decks[i];
                  return _DeckCard(
                    deck: deck,
                    onTap: () {
                      // Navigator.push = equivalente di navigation.navigate('Study', ...)
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder:
                              (_) => StudyScreen(
                                deck: deck,
                                onSessionComplete: onSessionComplete,
                              ),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _DeckCard extends StatelessWidget {
  final Deck deck;
  final VoidCallback onTap;

  const _DeckCard({required this.deck, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: kSurface,
          borderRadius: BorderRadius.circular(14),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.07),
              blurRadius: 6,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: Row(
          children: [
            Text(deck.emoji, style: const TextStyle(fontSize: 28)),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    deck.name,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: kPrimary,
                    ),
                  ),
                  Text(
                    '${deck.cards.length} carte',
                    style: const TextStyle(fontSize: 13, color: kTextMuted),
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: kBorder),
          ],
        ),
      ),
    );
  }
}

// StatefulWidget perché gestisce il proprio stato locale: flipped.
// Equivalente del componente FlipCard con useState<boolean>
class FlipCard extends StatefulWidget {
  final String front;
  final String back;

  const FlipCard({super.key, required this.front, required this.back});

  @override
  State<FlipCard> createState() => _FlipCardState();
}

class _FlipCardState extends State<FlipCard> {
  // Equivalente di: const [flipped, setFlipped] = useState(false)
  bool _flipped = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => setState(() => _flipped = !_flipped),
      child: Container(
        height: 240,
        decoration: BoxDecoration(
          color: _flipped ? kPrimary : kSurface,
          borderRadius: BorderRadius.circular(20),
          border: _flipped ? null : Border.all(color: kBorder),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Stack(
          children: [
            // Label in alto a sinistra
            Positioned(
              top: 16,
              left: 20,
              child: Text(
                _flipped ? 'RISPOSTA' : 'DOMANDA',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 1.2,
                  color: _flipped ? const Color(0xFFA5B4FC) : kTextMuted,
                ),
              ),
            ),
            // Testo centrale
            Center(
              child: Padding(
                padding: const EdgeInsets.all(28),
                child: Text(
                  _flipped ? widget.back : widget.front,
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.w600,
                    color: _flipped ? Colors.white : kPrimary,
                    height: 1.4,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            // Hint in basso
            Positioned(
              bottom: 16,
              left: 0,
              right: 0,
              child: Text(
                'tocca per girare',
                style: TextStyle(
                  fontSize: 11,
                  color: _flipped ? const Color(0xFFA5B4FC) : kBorder,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class StudyScreen extends StatefulWidget {
  final Deck deck;
  final void Function(Session) onSessionComplete;

  const StudyScreen({
    super.key,
    required this.deck,
    required this.onSessionComplete,
  });

  @override
  State<StudyScreen> createState() => _StudyScreenState();
}

class _StudyScreenState extends State<StudyScreen> {
  // Equivalente di useState per index, done, correct
  int _index = 0;
  bool _done = false;
  int _correct = 0;

  void _handleAnswer(bool wasCorrect) {
    final newCorrect = wasCorrect ? _correct + 1 : _correct;
    final next = _index + 1;

    if (next >= widget.deck.cards.length) {
      widget.onSessionComplete(
        Session(
          deck: widget.deck.name,
          correct: newCorrect,
          total: widget.deck.cards.length,
        ),
      );
      setState(() {
        _correct = newCorrect;
        _done = true;
      });
    } else {
      setState(() {
        _correct = newCorrect;
        _index = next;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    // Vista riepilogo finale
    if (_done) {
      final pct = (_correct / widget.deck.cards.length * 100).round();
      return Scaffold(
        appBar: AppBar(title: Text(widget.deck.name)),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  pct >= 70 ? '🏆' : '💪',
                  style: const TextStyle(fontSize: 56),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Completato!',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.w700,
                    color: kPrimary,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  '$_correct / ${widget.deck.cards.length} corrette',
                  style: const TextStyle(
                    fontSize: 16,
                    color: Color(0xFF6B7280),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  '$pct%',
                  style: const TextStyle(
                    fontSize: 48,
                    fontWeight: FontWeight.w700,
                    color: kAccent,
                  ),
                ),
                const SizedBox(height: 28),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: kPrimary,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                    ),
                    onPressed:
                        () => setState(() {
                          _index = 0;
                          _correct = 0;
                          _done = false;
                        }),
                    child: const Text(
                      'Riprova',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text(
                    '← Torna ai mazzi',
                    style: TextStyle(color: Color(0xFF6B7280), fontSize: 15),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    }

    final card = widget.deck.cards[_index];
    final progress = _index / widget.deck.cards.length;

    return Scaffold(
      appBar: AppBar(title: Text(widget.deck.name)),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // LinearProgressIndicator = equivalente della progress bar
              LinearProgressIndicator(
                value: progress,
                backgroundColor: kBorder,
                color: kAccent,
                minHeight: 5,
                borderRadius: BorderRadius.circular(3),
              ),
              const SizedBox(height: 8),
              Text(
                '${_index + 1} / ${widget.deck.cards.length}',
                style: const TextStyle(
                  fontSize: 12,
                  color: kTextMuted,
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.right,
              ),
              const SizedBox(height: 16),

              // FlipCard — ValueKey forza il reset dello stato quando cambia carta
              FlipCard(
                key: ValueKey(card.id),
                front: card.front,
                back: card.back,
              ),

              const SizedBox(height: 32),

              // Bottoni risposta
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: kDanger,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                      ),
                      onPressed: () => _handleAnswer(false),
                      child: const Text(
                        '✕  Non sapevo',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: kSuccess,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(14),
                        ),
                      ),
                      onPressed: () => _handleAnswer(true),
                      child: const Text(
                        '✓  Sapevo',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class StatsScreen extends StatelessWidget {
  // Prop: lista sessioni passata dall'alto — equivalente di { sessions }: StatsProps
  final List<Session> sessions;

  const StatsScreen({super.key, required this.sessions});

  @override
  Widget build(BuildContext context) {
    final totaleSessioni = sessions.length;
    final totaleCarte = sessions.fold(0, (sum, s) => sum + s.total);
    final totaleCorrette = sessions.fold(0, (sum, s) => sum + s.correct);
    final mediaPercentuale =
        totaleSessioni > 0 ? (totaleCorrette / totaleCarte * 100).round() : 0;

    return SafeArea(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.fromLTRB(24, 24, 24, 4),
            child: Text(
              'Statistiche',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.w700,
                color: kPrimary,
              ),
            ),
          ),
          const Padding(
            padding: EdgeInsets.fromLTRB(24, 0, 24, 20),
            child: Text(
              'Sessione corrente',
              style: TextStyle(fontSize: 14, color: kTextMuted),
            ),
          ),

          // Riepilogo globale
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              children: [
                _StatCard(value: '$totaleSessioni', label: 'Mazzi completati'),
                const SizedBox(width: 10),
                _StatCard(value: '$totaleCarte', label: 'Carte studiate'),
                const SizedBox(width: 10),
                _StatCard(
                  value: '$mediaPercentuale%',
                  label: 'Media corrette',
                  valueColor: kAccent,
                  flex: 2,
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Lista sessioni o empty state
          Expanded(
            child:
                totaleSessioni == 0
                    ? const Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text('📭', style: TextStyle(fontSize: 48)),
                          SizedBox(height: 12),
                          Text(
                            'Nessuna sessione completata.',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                              color: Color(0xFF6B7280),
                            ),
                          ),
                          Text(
                            'Vai su Mazzi e studia!',
                            style: TextStyle(fontSize: 13, color: kTextMuted),
                          ),
                        ],
                      ),
                    )
                    : ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      itemCount: sessions.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 12),
                      itemBuilder: (context, i) {
                        final s = sessions[i];
                        final pct = (s.correct / s.total * 100).round();
                        return Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 18,
                            vertical: 14,
                          ),
                          decoration: BoxDecoration(
                            color: kSurface,
                            borderRadius: BorderRadius.circular(14),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.07),
                                blurRadius: 6,
                                offset: const Offset(0, 1),
                              ),
                            ],
                          ),
                          child: Row(
                            children: [
                              Text(
                                '#${i + 1}',
                                style: const TextStyle(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w700,
                                  color: kBorder,
                                ),
                              ),
                              const SizedBox(width: 14),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      s.deck,
                                      style: const TextStyle(
                                        fontSize: 15,
                                        fontWeight: FontWeight.w600,
                                        color: kPrimary,
                                      ),
                                    ),
                                    Text(
                                      '${s.correct}/${s.total} corrette',
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: kTextMuted,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Text(
                                '$pct%',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.w700,
                                  color: pct >= 70 ? kSuccess : kDanger,
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
          ),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String value;
  final String label;
  final Color valueColor;
  final int flex;

  const _StatCard({
    required this.value,
    required this.label,
    this.valueColor = kPrimary,
    this.flex = 1,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: flex,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: kSurface,
          borderRadius: BorderRadius.circular(14),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.07),
              blurRadius: 6,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: Column(
          children: [
            Text(
              value,
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.w700,
                color: valueColor,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: const TextStyle(fontSize: 11, color: kTextMuted),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
