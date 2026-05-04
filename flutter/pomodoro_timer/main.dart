import 'dart:async';
import 'package:flutter/material.dart';

void main() {
  runApp(const PomodoroApp());
}

enum SessionType { pomodoro, pausa }

class HistoryEntry {
  final String id;
  final SessionType type;
  final int duration; // in minuti
  final String completedAt;

  const HistoryEntry({
    required this.id,
    required this.type,
    required this.duration,
    required this.completedAt,
  });
}

const int kPomodoroSeconds = 1 * 60;
const int kBreakSeconds = 1 * 60;

const Color kBackground = Color(0xFFF9F9F7);
const Color kSurface = Color(0xFFFFFFFF);
const Color kPrimary = Color(0xFF1A1A2E);
const Color kPomodoro = Color(0xFFEF4444);
const Color kPausa = Color(0xFF22C55E);
const Color kTextMuted = Color(0xFF9CA3AF);
const Color kBorder = Color(0xFFE5E7EB);

class PomodoroApp extends StatelessWidget {
  const PomodoroApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pomodoro',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: kBackground,
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

// StatefulWidget perché gestisce lo stato condiviso: la lista dello storico.
// Equivalente di useState<HistoryEntry[]>([]) in App.tsx
class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  final List<HistoryEntry> _history = [];
  int _currentTab = 0;

  void _onSessionComplete(HistoryEntry entry) {
    setState(() => _history.add(entry));
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> tabs = [
      TimerScreen(onSessionComplete: _onSessionComplete),
      HistoryScreen(history: _history),
    ];

    return Scaffold(
      appBar: AppBar(title: Text(_currentTab == 0 ? '🍅 Pomodoro' : 'Storico')),
      body: tabs[_currentTab],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentTab,
        onTap: (i) => setState(() => _currentTab = i),
        backgroundColor: kSurface,
        selectedItemColor: kPomodoro,
        unselectedItemColor: kTextMuted,
        selectedLabelStyle: const TextStyle(
          fontWeight: FontWeight.w600,
          fontSize: 12,
        ),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.timer), label: '⏱ Timer'),
          BottomNavigationBarItem(
            icon: Icon(Icons.list_alt),
            label: '📋 Storico',
          ),
        ],
      ),
    );
  }
}

class TimerScreen extends StatefulWidget {
  final void Function(HistoryEntry) onSessionComplete;

  const TimerScreen({super.key, required this.onSessionComplete});

  @override
  State<TimerScreen> createState() => _TimerScreenState();
}

class _TimerScreenState extends State<TimerScreen> {
  SessionType _sessionType = SessionType.pomodoro;
  int _secondsLeft = kPomodoroSeconds;
  bool _isRunning = false;

  // Timer? usa il ? perché il timer può essere null (non ancora avviato).
  // Equivalente di: const timeoutRef = useRef(null)
  Timer? _timer;

  // Avvia il timer
  // Timer.periodic = esegue il callback ogni secondo.
  // Equivalente del pattern useEffect + setTimeout ricorsivo in React Native.
  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (_secondsLeft == 0) {
        t.cancel(); // equivalente di clearTimeout
        _onComplete();
      } else {
        setState(() => _secondsLeft--);
      }
    });
  }

  // Cleanup del timer
  // _timer?.cancel() = cancella il timer solo se non è null.
  // Equivalente di: return () => clearTimeout(timeout) in useEffect.
  void _cancelTimer() {
    _timer?.cancel();
    _timer = null;
  }

  // Sessione completata
  void _onComplete() {
    setState(() => _isRunning = false);

    final duration =
        _sessionType == SessionType.pomodoro
            ? (kPomodoroSeconds / 60).toInt()
            : (kBreakSeconds / 60).toInt();
    final now = DateTime.now();
    final completedAt =
        '${now.hour.toString().padLeft(2, '0')}:${now.minute.toString().padLeft(2, '0')}';

    widget.onSessionComplete(
      HistoryEntry(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        type: _sessionType,
        duration: duration,
        completedAt: completedAt,
      ),
    );
  }

  // Toggle avvia/pausa
  void _toggleRunning() {
    setState(() => _isRunning = !_isRunning);
    if (_isRunning) {
      _startTimer();
    } else {
      _cancelTimer(); // cleanup quando si mette in pausa
    }
  }

  // Reset
  void _reset() {
    _cancelTimer(); // cleanup prima del reset
    setState(() {
      _isRunning = false;
      _secondsLeft =
          _sessionType == SessionType.pomodoro
              ? kPomodoroSeconds
              : kBreakSeconds;
    });
  }

  // Cambia tipo sessione
  void _switchSession(SessionType type) {
    _cancelTimer(); // cleanup prima di cambiare sessione
    setState(() {
      _sessionType = type;
      _isRunning = false;
      _secondsLeft =
          type == SessionType.pomodoro ? kPomodoroSeconds : kBreakSeconds;
    });
  }

  // dispose: cleanup quando il widget viene rimosso dalla UI
  // Equivalente del cleanup finale di useEffect quando il componente si smonta.
  @override
  void dispose() {
    _cancelTimer();
    super.dispose();
  }

  String _formatTime(int seconds) {
    final m = (seconds ~/ 60).toString().padLeft(2, '0');
    final s = (seconds % 60).toString().padLeft(2, '0');
    return '$m:$s';
  }

  @override
  Widget build(BuildContext context) {
    final accentColor =
        _sessionType == SessionType.pomodoro ? kPomodoro : kPausa;
    final totalSeconds =
        _sessionType == SessionType.pomodoro ? kPomodoroSeconds : kBreakSeconds;
    final progress = (totalSeconds - _secondsLeft) / totalSeconds;

    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          children: [
            const SizedBox(height: 24),

            // Selettore tipo sessione
            Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: kBorder,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                children:
                    [SessionType.pomodoro, SessionType.pausa].map((type) {
                      final isSelected = _sessionType == type;
                      final label =
                          type == SessionType.pomodoro
                              ? '🍅 Pomodoro'
                              : '☕ Pausa';
                      return Expanded(
                        child: GestureDetector(
                          onTap: () => _switchSession(type),
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 10),
                            decoration: BoxDecoration(
                              color:
                                  isSelected ? accentColor : Colors.transparent,
                              borderRadius: BorderRadius.circular(9),
                            ),
                            child: Text(
                              label,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w600,
                                color: isSelected ? Colors.white : kTextMuted,
                              ),
                            ),
                          ),
                        ),
                      );
                    }).toList(),
              ),
            ),

            const SizedBox(height: 48),

            // Cerchio timer
            Container(
              width: 220,
              height: 220,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: accentColor, width: 6),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    _formatTime(_secondsLeft),
                    style: TextStyle(
                      fontSize: 52,
                      fontWeight: FontWeight.w700,
                      color: accentColor,
                      letterSpacing: 2,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    _sessionType == SessionType.pomodoro ? 'Pomodoro' : 'Pausa',
                    style: const TextStyle(
                      fontSize: 14,
                      color: kTextMuted,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 40),

            // Barra di progresso
            ClipRRect(
              borderRadius: BorderRadius.circular(3),
              child: LinearProgressIndicator(
                value: progress,
                backgroundColor: kBorder,
                color: accentColor,
                minHeight: 6,
              ),
            ),

            const SizedBox(height: 36),

            // Controlli
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    style: OutlinedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 18),
                      side: const BorderSide(color: kBorder),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                    ),
                    onPressed: _reset,
                    child: const Text(
                      '↺  Reset',
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: kPrimary,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 14),
                Expanded(
                  flex: 2,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: accentColor,
                      padding: const EdgeInsets.symmetric(vertical: 18),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                    ),
                    onPressed: _toggleRunning,
                    child: Text(
                      _isRunning ? '⏸  Pausa' : '▶  Avvia',
                      style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class HistoryScreen extends StatelessWidget {
  final List<HistoryEntry> history;

  const HistoryScreen({super.key, required this.history});

  @override
  Widget build(BuildContext context) {
    final pomodoriCompletati =
        history.where((e) => e.type == SessionType.pomodoro).length;
    final pauseCompletate =
        history.where((e) => e.type == SessionType.pausa).length;
    final minutiTotali = history.fold(0, (sum, e) => sum + e.duration);

    return SafeArea(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.fromLTRB(24, 24, 24, 4),
            child: Text(
              'Storico',
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

          // Statistiche riassuntive
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              children: [
                _StatCard(
                  value: '$pomodoriCompletati',
                  label: '🍅 Pomodori',
                  valueColor: kPomodoro,
                ),
                const SizedBox(width: 10),
                _StatCard(
                  value: '$pauseCompletate',
                  label: '☕ Pause',
                  valueColor: kPausa,
                ),
                const SizedBox(width: 10),
                _StatCard(value: '$minutiTotali', label: '⏱ Minuti'),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Lista storico o empty state
          Expanded(
            child:
                history.isEmpty
                    ? const Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text('🍅', style: TextStyle(fontSize: 48)),
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
                            'Avvia il timer per iniziare!',
                            style: TextStyle(fontSize: 13, color: kTextMuted),
                          ),
                        ],
                      ),
                    )
                    : ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      itemCount: history.length,
                      separatorBuilder: (_, __) => const SizedBox(height: 10),
                      itemBuilder: (context, i) {
                        // Mostriamo in ordine inverso (più recente in cima)
                        final entry = history[history.length - 1 - i];
                        final isPomodoro = entry.type == SessionType.pomodoro;
                        final pct = history.length - i;

                        return Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16,
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
                                isPomodoro ? '🍅' : '☕',
                                style: const TextStyle(fontSize: 26),
                              ),
                              const SizedBox(width: 14),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      isPomodoro ? 'Pomodoro' : 'Pausa',
                                      style: const TextStyle(
                                        fontSize: 15,
                                        fontWeight: FontWeight.w600,
                                        color: kPrimary,
                                      ),
                                    ),
                                    Text(
                                      '${entry.duration} min · completato alle ${entry.completedAt}',
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: kTextMuted,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Text(
                                '#$pct',
                                style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w700,
                                  color: isPomodoro ? kPomodoro : kPausa,
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

  const _StatCard({
    required this.value,
    required this.label,
    this.valueColor = kPrimary,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
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
                fontSize: 26,
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
