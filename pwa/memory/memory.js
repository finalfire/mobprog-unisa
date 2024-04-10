const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
};
  

// Genera i simboli per ogni bottone
const generateButtons = (() => {
    // funzione interna, sample di un elemento da un array
    const sample = (a) => {
        return a[Math.floor(Math.random() * a.length)];
    };
    
    // funzione interna, rimuove un elemento da un array
    const remove = (a, value) => {
        let i = a.indexOf(value);
        a.splice(i, 1);
        return a;
    };

    // possibili simboli (hardcoded)
    let symbols = [..."👾🧠🦓🐠🦢🌈🍕🍹"];
    
    let buttons = new Array();
    for (let i = 0; i < 16; i++) {
        buttons.push({
            id: i,
            btn: document.getElementById(`btn-${i}`),
            available: true
        });
    }

    // pick di una coppia e assegnazione del primo simbolo
    let pairs = [...Array(buttons.length).keys()];
    while (pairs.length >= 2) {
        let m1 = sample(pairs);
        pairs = remove(pairs, m1);
        let m2 = sample(pairs);
        pairs = remove(pairs, m2);
        
        buttons[m1].value = symbols[0];
        buttons[m2].value = symbols[0];
        symbols = symbols.splice(1);
    }

    return buttons;
});

const flipCard = (card, value, gameInstance) => {
    card.btn.textContent = value;
}

const handleMove = async (currentBtn, gameInstance) => {
    let currentCard = gameInstance.cards.find(card => card.btn === currentBtn);

    if (!currentCard.available)
        return;

    // stato 0: ho scelto una carta
    if (gameInstance.state === 0) {
        gameInstance.lastCard = currentCard;
        gameInstance.lastCard.available = false;
        
        flipCard(gameInstance.lastCard, gameInstance.lastCard.value, gameInstance);
        
        gameInstance.state = 1;
    // stato 1: una seconda carta è stata flippata, check se accoppiata con la prima
    } else {
        flipCard(currentCard, currentCard.value, gameInstance);

        await delay(1000);

        if (currentCard.btn.textContent === gameInstance.lastCard.btn.textContent) {
            currentCard.available = false;

        } else {
            flipCard(currentCard, '\u00A0', gameInstance);
            flipCard(gameInstance.lastCard, '\u00A0', gameInstance);

            currentCard.available = true;
            gameInstance.lastCard.available = true;
        }

        gameInstance.state = 0;
    }

    gameInstance.nMoves++;
    gameInstance.updateMoves();
};

class Game {
    // 0 -> nessuna scelta fatta
    // 1 -> una carta scoperta
    state = 0;
    // numero di mosse
    nMoves= 0;

    // tutte le carte attualmente disponibili
    cards = generateButtons();
    // ultima carta scelta
    lastCard = undefined;

    // aggiorna il componente delle mosse
    updateMoves = () => { 
        document.getElementById("nMoves").textContent = this.nMoves;
    };

    // resetta il gioco
    reset = () => {
        this.state = 0;
        this.nMoves = 0;
        this.cards = generateButtons(),
        this.lastCard = undefined

        for (let card of this.cards)
            flipCard(card, '\u00A0', this);

        this.updateMoves();
    };
};

const game = new Game();
for (let card of game.cards) {
    card.btn.addEventListener("click", (e) => {
        handleMove(e.target, game);
    });
}

document.getElementById("reset").addEventListener("click", game.reset);