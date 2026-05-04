import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type SessionType = 'Pomodoro' | 'Pausa';

type HistoryEntry = {
  id: string;
  type: SessionType;
  duration: number; // in minuti
  completedAt: string;
};

type TabParamList = {
  Timer: undefined;
  Storico: undefined;
};

const POMODORO_SECONDS = 25 * 60;
const BREAK_SECONDS    = 5 * 60;

const COLORS = {
  background: '#F9F9F7',
  surface:    '#FFFFFF',
  primary:    '#1A1A2E',
  pomodoro:   '#EF4444',
  pausa:      '#22C55E',
  textMuted:  '#9CA3AF',
  border:     '#E5E7EB',
};

// ─── SCHERMATA TIMER ──────────────────────────────────────────────────────────

type TimerScreenProps = {
  onSessionComplete: (entry: HistoryEntry) => void;
};

function TimerScreen({ onSessionComplete }: TimerScreenProps) {
  const [sessionType, setSessionType] = useState<SessionType>('Pomodoro');
  const [secondsLeft, setSecondsLeft] = useState<number>(POMODORO_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const accentColor = sessionType === 'Pomodoro' ? COLORS.pomodoro : COLORS.pausa;

  // Nota bene: useEffect è una hook functionche permette di eseguire
  // del codice DOPO che un componente abbia terminato il render.
  // Si usa per implmenetare i side effect (feature che vanno oltre la semplice UI)

  // useEffect si riesegue ogni volta che cambia isRunning o secondsLeft.
  // Se il timer è attivo, aspetto 1 secondo con setTimeout e poi
  // decremento secondsLeft di 1. cleanup cancella
  // il timeout se il componente cambia stato prima che scada il secondo
  useEffect(() => {
    if (!isRunning || secondsLeft === 0) return;

    const timeout = setTimeout(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    // il return della function di un useEffect è anche
    // detto cleanup (opzionale), e viene eseguito prima che
    // l'effect si riesegua o quando il componente non viene più utilizzato
    // ("unmonunted" dal DOM)
    // qui a cosa serve? supponiamo che secondsLeft sia == 10 e premiamo Pausa nella UI
    // prima che il secondo passi; React riesegue l'effect perché isRunning è cambiato, ma
    // il setTimeour del tick precedente è ancora vivo e scatterà dopo il tempo che resta
    // per arrivare ad un secondo, decrementando secondsLeft anche se il timer è in pausa.
    // in questo caso, React esegue il cleanup dell'effect precedente: serve ad avere
    // la garanzia che ogni effect annulli ciò che ha creato, prima di essere sostituito dal successivo
    return () => clearTimeout(timeout);

    // il secondo parametro di useEffect è anche detto "dependency array"
    // e controlla quando l'effect si riesegue:
    // - se == null, allora si esegue ad ogni render,
    // - se == [], allora si esegue solo al primo render (detto anche "mount")
    // - se == [a], allora si esegue al primo render e ogni volta che a cambia
  }, [isRunning, secondsLeft]);

  // questo side effect è per la sessione completata
  useEffect(() => {
    if (secondsLeft !== 0) return;

    setIsRunning(false);

    const duration = sessionType === 'Pomodoro' ? 25 : 5;
    const now = new Date();
    const completedAt =
      `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    onSessionComplete({ id: String(Date.now()), type: sessionType, duration, completedAt });
  }, [secondsLeft]);

  const switchSession = (type: SessionType): void => {
    setSessionType(type);
    setIsRunning(false);
    setSecondsLeft(type === 'Pomodoro' ? POMODORO_SECONDS : BREAK_SECONDS);
  };

  const reset = (): void => {
    setIsRunning(false);
    setSecondsLeft(sessionType === 'Pomodoro' ? POMODORO_SECONDS : BREAK_SECONDS);
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const totalSeconds = sessionType === 'Pomodoro' ? POMODORO_SECONDS : BREAK_SECONDS;
  const progress = (totalSeconds - secondsLeft) / totalSeconds;

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.segmentRow}>
        {(['Pomodoro', 'Pausa'] as SessionType[]).map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.segmentBtn, sessionType === type && { backgroundColor: accentColor }]}
            onPress={() => switchSession(type)}
          >
            <Text style={[styles.segmentText, sessionType === type && { color: '#fff' }]}>
              {type === 'Pomodoro' ? '🍅 Pomodoro' : '☕ Pausa'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.timerCircle, { borderColor: accentColor }]}>
        <Text style={[styles.timerText, { color: accentColor }]}>
          {formatTime(secondsLeft)}
        </Text>
        <Text style={styles.timerLabel}>{sessionType}</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: accentColor }]} />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.btnSecondary} onPress={reset}>
          <Text style={styles.btnSecondaryText}>↺  Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnPrimary, { backgroundColor: accentColor }]}
          onPress={() => setIsRunning((r) => !r)}
        >
          <Text style={styles.btnPrimaryText}>{isRunning ? '⏸  Pausa' : '▶  Avvia'}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

type HistoryScreenProps = {
  history: HistoryEntry[];
};

function HistoryScreen({ history }: HistoryScreenProps) {
  const pomodoriCompletati = history.filter((e) => e.type === 'Pomodoro').length;
  const pauseCompletate    = history.filter((e) => e.type === 'Pausa').length;
  const minutiTotali       = history.reduce((sum, e) => sum + e.duration, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Storico</Text>
      <Text style={styles.pageSubtitle}>Sessione corrente</Text>

      {/* Statistiche riassuntive */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: COLORS.pomodoro }]}>{pomodoriCompletati}</Text>
          <Text style={styles.statLabel}>🍅 Pomodori</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: COLORS.pausa }]}>{pauseCompletate}</Text>
          <Text style={styles.statLabel}>☕ Pause</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{minutiTotali}</Text>
          <Text style={styles.statLabel}>⏱ Minuti</Text>
        </View>
      </View>

      {/* Lista sessioni o empty state */}
      {history.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>🍅</Text>
          <Text style={styles.emptyText}>Nessuna sessione completata.</Text>
          <Text style={styles.emptyHint}>Avvia il timer per iniziare!</Text>
        </View>
      ) : (
        <FlatList
          data={[...history].reverse()}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item, index }) => (
            <View style={styles.historyCard}>
              <Text style={styles.historyEmoji}>
                {item.type === 'Pomodoro' ? '🍅' : '☕'}
              </Text>
              <View style={styles.historyBody}>
                <Text style={styles.historyType}>{item.type}</Text>
                <Text style={styles.historyDetail}>
                  {item.duration} min · completato alle {item.completedAt}
                </Text>
              </View>
              <Text style={[styles.historyBadge,
                { color: item.type === 'Pomodoro' ? COLORS.pomodoro : COLORS.pausa }]}>
                #{history.length - index}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

// ─── NAVIGAZIONE ──────────────────────────────────────────────────────────────

const Tab = createBottomTabNavigator<TabParamList>();

export default function App() {
  // Stato globale: vive in App e viene passato giù come prop
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleSessionComplete = (entry: HistoryEntry): void => {
    setHistory((prev) => [...prev, entry]);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: COLORS.background },
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: '600' as const, color: COLORS.primary },
            tabBarActiveTintColor: COLORS.pomodoro,
            tabBarInactiveTintColor: COLORS.textMuted,
            tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border },
            tabBarLabelStyle: { fontSize: 12, fontWeight: '600' as const },
          }}
        >
          <Tab.Screen name="Timer" options={{ title: '🍅 Pomodoro', tabBarLabel: '⏱ Timer' }}>
            {() => <TimerScreen onSessionComplete={handleSessionComplete} />}
          </Tab.Screen>

          <Tab.Screen name="Storico" options={{ title: 'Storico', tabBarLabel: '📋 Storico' }}>
            {() => <HistoryScreen history={history} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

// ─── STILI ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Selettore sessione
  segmentRow: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: COLORS.border,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },

  // Cerchio timer
  timerCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 6,
    alignSelf: 'center',
    marginTop: 48,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 52,
    fontWeight: '700',
    letterSpacing: 2,
  },
  timerLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
    marginTop: 4,
  },

  // Progress bar
  progressTrack: {
    height: 6,
    backgroundColor: COLORS.border,
    marginHorizontal: 24,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Controlli
  controls: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 36,
    gap: 14,
  },
  btnPrimary: {
    flex: 2,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  btnSecondary: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnSecondaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Storico
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 24,
    marginHorizontal: 24,
  },
  pageSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 4,
    marginHorizontal: 24,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  historyEmoji: { fontSize: 26 },
  historyBody: { flex: 1, marginLeft: 14 },
  historyType: { fontSize: 15, fontWeight: '600', color: COLORS.primary },
  historyDetail: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  historyBadge: { fontSize: 15, fontWeight: '700' },

  // Empty state
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#6b7280' },
  emptyHint: { fontSize: 13, color: COLORS.textMuted, marginTop: 4 },
});