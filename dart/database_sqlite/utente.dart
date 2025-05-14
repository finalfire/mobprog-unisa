class Utente {
  final int matricola;
  final String nome;
  final int eta;
  final String ruolo;

  const Utente(
      {required this.matricola,
      required this.nome,
      required this.eta,
      required this.ruolo});

  // Converte un Utente in una Map; le chiavi sono le colonne
  // della tabella `utenti` nel database
  Map<String, Object?> toMap() {
    return {'matricola': matricola, 'nome': nome, 'eta': eta, 'ruolo': ruolo};
  }

  @override
  String toString() {
    return 'Utente{matricola: $matricola, nome: $nome, eta: $eta, ruolo: $ruolo}';
  }
}
