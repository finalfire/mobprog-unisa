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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Card = {
  id: string;
  front: string;
  back: string;
};

type Deck = {
  id: string;
  emoji: string;
  name: string;
  cards: Card[];
};

type Session = {
  deck: string;
  correct: number;
  total: number;
};

// Parametri delle schermate dello Stack (Mazzi)
type StackParamList = {
  Home: undefined;
  Study: {
    deck: Deck;
    onSessionComplete: (session: Session) => void;
  };
};

// Parametri delle tab
type TabParamList = {
  Mazzi: undefined;
  Statistiche: undefined;
};

const DECKS: Deck[] = [
  {
    id: '1',
    emoji: '⚛️',
    name: 'React Native',
    cards: [
      { id: 'c1', front: 'Cos\'è JSX?', back: 'Estensione sintattica di JS che permette di scrivere UI dichiarativa simile all\'HTML' },
      { id: 'c2', front: 'Cos\'è lo State?', back: 'Dati locali di un componente che, quando cambiano, causano un re-render' },
      { id: 'c3', front: 'Cos\'è una Prop?', back: 'Parametro passato da un componente padre al figlio, accessibile in sola lettura' },
      { id: 'c4', front: 'FlatList vs ScrollView', back: 'FlatList usa lazy rendering ed è ottimizzata per liste lunghe; ScrollView renderizza tutto subito' },
      { id: 'c5', front: 'useEffect serve a?', back: 'Eseguire side effects (fetch, timer, subscription) dopo il render del componente' },
      { id: 'c6', front: 'useState restituisce?', back: 'Un array con il valore corrente dello state e una funzione per aggiornarlo' },
      { id: 'c7', front: 'SafeAreaView serve a?', back: 'Evitare che il contenuto finisca sotto le aree di sistema (notch, barra di stato)' },
      { id: 'c8', front: 'StyleSheet.create serve a?', back: 'Ottimizzare gli stili inviandoli al native layer una sola volta' },
      { id: 'c9', front: 'Cos\'è il Bridge?', back: 'Il meccanismo che permette la comunicazione tra JS thread e native thread' },
      { id: 'c10', front: 'TouchableOpacity vs Pressable', back: 'Pressable è più flessibile e moderno; TouchableOpacity gestisce solo l\'opacità al tap' },
    ],
  },
  {
    id: '2',
    emoji: '🟨',
    name: 'JavaScript',
    cards: [
      { id: 'c1', front: 'var vs let vs const', back: 'var è function-scoped; let e const sono block-scoped; const non può essere riassegnata' },
      { id: 'c2', front: 'Cos\'è una Promise?', back: 'Oggetto che rappresenta il risultato futuro (o fallimento) di un\'operazione asincrona' },
      { id: 'c3', front: 'Cosa fa async/await?', back: 'Permette di scrivere codice asincrono in modo sincrono, semplificando la gestione delle Promise' },
      { id: 'c4', front: 'Cos\'è il closure?', back: 'Una funzione che ricorda le variabili del suo scope esterno anche dopo che quello scope è terminato' },
      { id: 'c5', front: '== vs ===', back: '== confronta il valore con coercizione di tipo; === confronta valore E tipo (preferibile)' },
      { id: 'c6', front: 'map() fa?', back: 'Crea un nuovo array applicando una funzione a ogni elemento, senza modificare l\'originale' },
      { id: 'c7', front: 'filter() fa?', back: 'Restituisce un nuovo array con solo gli elementi che soddisfano una condizione booleana' },
      { id: 'c8', front: 'reduce() fa?', back: 'Riduce un array a un singolo valore accumulando i risultati con una funzione' },
    ],
  },
];

// la & indica un intersection type, e significa "tutti i campi del primo e secondo oggetto"
type HomeProps = NativeStackScreenProps<StackParamList, 'Home'> & {
  onSessionComplete: (session: Session) => void;
};

const HomeScreen = ({ navigation, onSessionComplete }: HomeProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Flashcard</Text>
      <Text style={styles.subtitle}>Scegli un mazzo per iniziare</Text>

      <FlatList
        data={DECKS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Study', { deck: item, onSessionComplete })}
          >
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <View style={styles.cardBody}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardCount}>{item.cards.length} carte</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

type FlipCardProps = {
  front: string;
  back: string;
};

function FlipCard({ front, back }: FlipCardProps) {
  const [flipped, setFlipped] = useState<boolean>(false);

  return (
    <TouchableOpacity
      onPress={() => setFlipped((f) => !f)}
      activeOpacity={0.8}
      style={styles.flipContainer}
    >
      {flipped ? (
        <View style={[styles.flipCard, styles.flipBack]}>
          <Text style={[styles.flipLabel, { color: '#a5b4fc' }]}>Risposta</Text>
          <Text style={[styles.flipText, { color: '#fff' }]}>{back}</Text>
          <Text style={[styles.flipHint, { color: '#a5b4fc' }]}>tocca per girare</Text>
        </View>
      ) : (
        <View style={[styles.flipCard, styles.flipFront]}>
          <Text style={styles.flipLabel}>Domanda</Text>
          <Text style={styles.flipText}>{front}</Text>
          <Text style={styles.flipHint}>tocca per girare</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

type StudyProps = NativeStackScreenProps<StackParamList, 'Study'>;

function StudyScreen({ route, navigation }: StudyProps) {
  const { deck, onSessionComplete } = route.params;

  // Aggiorniamo il titolo dell'header con il nome del mazzo
  // useEffect lo usiamo per un side effect DOPO aver eseguito il render
  useEffect(() => {
    navigation.setOptions({ title: deck.name });
  }, [deck.name]);

  const [index, setIndex] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);
  const [correct, setCorrect] = useState<number>(0);

  const card: Card = deck.cards[index];
  const progress: number = (index / deck.cards.length) * 100;

  const handleAnswer = (wasCorrect: boolean): void => {
    const newCorrect = wasCorrect ? correct + 1 : correct;
    const next = index + 1;
    if (next >= deck.cards.length) {
      setCorrect(newCorrect);
      // Notifichiamo App con i dati della sessione appena completata
      onSessionComplete({ deck: deck.name, correct: newCorrect, total: deck.cards.length });
      setDone(true);
    } else {
      setCorrect(newCorrect);
      setIndex(next);
    }
  };

  // Vista riepilogo finale
  if (done) {
    const pct = Math.round((correct / deck.cards.length) * 100);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultBox}>
          <Text style={styles.resultEmoji}>{pct >= 70 ? '🏆' : '💪'}</Text>
          <Text style={styles.resultTitle}>Completato!</Text>
          <Text style={styles.resultScore}>{correct} / {deck.cards.length} corrette</Text>
          <Text style={styles.resultPct}>{pct}%</Text>

          <TouchableOpacity style={styles.btnPrimary} onPress={() => { setIndex(0); setCorrect(0); setDone(false); }}>
            <Text style={styles.btnPrimaryText}>Riprova</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.goBack()}>
            <Text style={styles.btnSecondaryText}>← Torna ai mazzi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressLabel}>{index + 1} / {deck.cards.length}</Text>

      {/* Carta */}
      <FlipCard key={card.id} front={card.front} back={card.back} />

      {/* Bottoni risposta */}
      <View style={styles.answerRow}>
        <TouchableOpacity style={[styles.answerBtn, { backgroundColor: '#ef4444' }]} onPress={() => handleAnswer(false)}>
          <Text style={styles.answerBtnText}>✕  Non sapevo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.answerBtn, { backgroundColor: '#22c55e' }]} onPress={() => handleAnswer(true)}>
          <Text style={styles.answerBtnText}>✓  Sapevo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

type StatsProps = {
  sessions: Session[];
};

function StatsScreen({ sessions }: StatsProps) {
  const totaleSessioni: number = sessions.length;
  const totaleCarte: number = sessions.reduce((sum, s) => sum + s.total, 0);
  const totaleCorrette: number = sessions.reduce((sum, s) => sum + s.correct, 0);
  const mediaPercentuale: number =
    totaleSessioni > 0 ? Math.round((totaleCorrette / totaleCarte) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Statistiche</Text>
      <Text style={styles.subtitle}>Sessione corrente</Text>

      {/* Riepilogo globale */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totaleSessioni}</Text>
          <Text style={styles.statLabel}>Mazzi completati</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totaleCarte}</Text>
          <Text style={styles.statLabel}>Carte studiate</Text>
        </View>
        <View style={[styles.statCard, { flex: 2 }]}>
          <Text style={[styles.statNumber, { color: '#4f46e5' }]}>{mediaPercentuale}%</Text>
          <Text style={styles.statLabel}>Media risposte corrette</Text>
        </View>
      </View>

      {/* Lista sessioni o empty state */}
      {totaleSessioni === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyText}>Nessuna sessione completata.</Text>
          <Text style={styles.emptyHint}>Vai su Mazzi e studia!</Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(_, i) => String(i)}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => {
            const pct = Math.round((item.correct / item.total) * 100);
            return (
              <View style={styles.sessionCard}>
                <View style={styles.sessionLeft}>
                  <Text style={styles.sessionIndex}>#{index + 1}</Text>
                  <View>
                    <Text style={styles.sessionDeck}>{item.deck}</Text>
                    <Text style={styles.sessionDetail}>{item.correct}/{item.total} corrette</Text>
                  </View>
                </View>
                <Text style={[styles.sessionPct, { color: pct >= 70 ? '#22c55e' : '#ef4444' }]}>
                  {pct}%
                </Text>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const stackOptions = {
  headerStyle: { backgroundColor: '#f9f9f7' },
  headerShadowVisible: false,
  headerTintColor: '#1a1a2e',
  headerTitleStyle: { fontWeight: '600' as const },
};

// Stack annidato nella tab Mazzi: Home -> Study
type MazziStackProps = {
  onSessionComplete: (session: Session) => void;
};

function MazziStack({ onSessionComplete }: MazziStackProps) {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="Home" options={{ title: 'Le mie Flashcard' }}>
        {(props) => <HomeScreen {...props} onSessionComplete={onSessionComplete} />}
      </Stack.Screen>
      <Stack.Screen
        name="Study"
        component={StudyScreen}
        options={{ title: 'Studio', headerBackTitle: 'Indietro' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  // Stato globale: vive in App e viene passato giù come prop
  const [sessions, setSessions] = useState<Session[]>([]);

  const handleSessionComplete = (session: Session): void => {
    setSessions((prev) => [...prev, session]);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#4f46e5',
            tabBarInactiveTintColor: '#9ca3af',
            tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#e5e7eb' },
            tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
          }}
        >
          <Tab.Screen name="Mazzi" options={{ tabBarLabel: '📚  Mazzi' }}>
            {() => <MazziStack onSessionComplete={handleSessionComplete} />}
          </Tab.Screen>

          <Tab.Screen
            name="Statistiche"
            options={{
              tabBarLabel: '📊  Statistiche',
              headerShown: true,
              headerStyle: { backgroundColor: '#f9f9f7' },
              headerShadowVisible: false,
              headerTitleStyle: { fontWeight: '600' as const },
            }}
          >
            {() => <StatsScreen sessions={sessions} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },

  // Home
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
    marginTop: 24,
    marginHorizontal: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
    marginHorizontal: 24,
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  cardEmoji: { fontSize: 28 },
  cardBody: { flex: 1, marginLeft: 14 },
  cardName: { fontSize: 16, fontWeight: '600', color: '#1a1a2e' },
  cardCount: { fontSize: 13, color: '#9ca3af', marginTop: 2 },
  arrow: { fontSize: 22, color: '#d1d5db' },

  // FlipCard
  flipContainer: {
    height: 240,
    marginHorizontal: 24,
    marginTop: 24,
  },
  flipCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  flipFront: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  flipBack: {
    backgroundColor: '#1a1a2e',
  },
  flipLabel: {
    position: 'absolute',
    top: 16,
    left: 20,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#9ca3af',
  },
  flipText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1a1a2e',
    textAlign: 'center',
    lineHeight: 30,
  },
  flipHint: {
    position: 'absolute',
    bottom: 16,
    fontSize: 11,
    color: '#d1d5db',
  },

  // Study
  progressTrack: {
    height: 5,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
    textAlign: 'right',
    marginHorizontal: 24,
    marginTop: 6,
  },
  answerRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 24,
    marginTop: 32,
  },
  answerBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  answerBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  // Result
  resultBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  resultEmoji: { fontSize: 56, marginBottom: 16 },
  resultTitle: { fontSize: 24, fontWeight: '700', color: '#1a1a2e' },
  resultScore: { fontSize: 16, color: '#6b7280', marginTop: 8 },
  resultPct: { fontSize: 48, fontWeight: '700', color: '#4f46e5', marginVertical: 24 },
  btnPrimary: {
    width: '100%',
    backgroundColor: '#1a1a2e',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  btnSecondary: { paddingVertical: 12 },
  btnSecondaryText: { color: '#6b7280', fontSize: 15 },

  // Stats
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  statLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'center',
  },
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  sessionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  sessionIndex: {
    fontSize: 13,
    fontWeight: '700',
    color: '#d1d5db',
    width: 24,
  },
  sessionDeck: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  sessionDetail: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  sessionPct: {
    fontSize: 18,
    fontWeight: '700',
  },

  // Empty state
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#6b7280' },
  emptyHint: { fontSize: 13, color: '#9ca3af', marginTop: 4 },
});