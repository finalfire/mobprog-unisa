// Eredita da Map (l'implementazione di hashmap di default in JavaScript)
// get() fa sì che se la chiave non esiste, allora si restituisce un valore di default
class DefaultMap extends Map {
    constructor(defaultValue) {
        super();
        this.defaultValue = defaultValue;
    }

    get(key) {
        if (this.has(key))
            return super.get(key);
        else
            return this.defaultValue;
    }
}

// La classe rappresentante il nostro istogramma
class Histogram {
    constructor() {
        // mappa: carattere -> frequenza
        this.charToFreq = new DefaultMap(0);
        // il numero totale di caratteri letti
        this.n = 0;
    }

    // Parserizza una stringa e aggiunge i caratteri alla mappa
    add(text) {
        // s.replace(x,y) sostituisce la sottostringa x con y in s
        // in questo caso, x è una è l'espressione regolare /\s/g che si legge "trova tutti gli spazi":
        //  /\s/    è un match, e indica "trova uno spazio bianco"
        // g        indica che saranno considerati tutti i match
        text = text.replace(/\s/g, "").toUpperCase();
        // iterare su una stringa significa accedere ad ogni carattere dal 0-esimo al n-1-esimo
        for (let char of text) {
            // la frequenza attualmente memorizzata per il carattere char
            let n = this.charToFreq.get(char);
            // h.set(k, v) modifica la chiave k nella mappa h con il valore v
            this.charToFreq.set(char, n+1);
            // aggiorniamo il numero totale di caratteri letti
            this.n++;
        }
    }

    // Overriding del metodo Object.toString()
    toString() {
        // L'operatore ... permette di creare un array da un oggetto iterable
        // (un oggetto è iterable se implementa il protocollo iterable tramite il metodo [Symbol.iterable]())
        // In questo caso, la mappa viene "spacchettata" in un array contenente coppie (chiave, valore)
        let entries = [...this.charToFreq];

        // a.sort() ordina in modo crescente oppure a.sort(f), dove f è una funzione che compara due elementi
        // f in questo caso viene anche detta "funzione anonima" (non ha un nome associato)
        // in questo caso, sia a che b sono due coppie (array di lunghezza 2)
        // e le ordiniamo rispetto al conteggio; se uguale, allora lessicograficamente
        entries.sort((a,b) => {
            if (a[1] === b[1])
                return a[0] < b[0] ? -1 : 1;  // if ternario: condizione ? vero : falso
            else
                return b[1] - a[1];
        })

        // convertiamo la frequenza in percentuale
        for (let entry of entries) {
            entry[1] = entry[1] / this.n * 100;
        }

        // a.filter(f) restituisce l'array contenente solo gli elementi di a che rispettono la condizione f
        // anche questo è un caso in cui utilizziamo una funzione anonima
        entries = entries.filter(entry => entry[1] >= 1);

        // a.map(f) invoca la funzione f per ogni elemento dell'array a e restituisce l'array con gli elementi modificati da f
        // anche qui funzione anonima che accetta un array di due elementi
        let bars = entries.map(
            // `${}` indica un template literal (NOTA BENE il simbolo `)
            // un template literale permette di "embeddare" una o più espressioni in una stringa
            // ${char}  interpola nella stringa il valore di char
            // s.repeat(k)  restituisce una stringa formata dalla concatenazione di s per k volte
            // Math.round(p)    arrotonda p all'intero più vicino
            // p.toFixed(2) indica il numero di cifre decimali
            ([char,perc]) => `${char}: ${"#".repeat(Math.round(perc))} ${perc.toFixed(2)}`
        );
        
        // a.join(s) concatena i valori in a utilizzando la stringa s come delimitatore
        return bars.join("\n");
    }
}

// async indica una funzione asincrona, la quale restituisce un oggetto Promise
// un Promise è un oggetto che rappresenta l'eventuale completamento (o fallimento) di una operazione asincrona e del suo risultato
// la keyword async:
//  - permette di utilizzare "await" all'interno della funzione per mettere in pausa la sua esecuzione,
//  - l'esecuzione resta in pausa fino alla risoluzione del Promise
//  - non mette in pausa il thread principale
async function hist() {
    // indica che l'encoding dei dati letti in stdin è utf-8 (interpreta i byte letti)
    process.stdin.setEncoding("utf-8");
    let histogram = new Histogram();

    /*
    the data comes in asynchronously as the user types input or as data is piped into the process. You can't predict when the next chunk of data will be available, and trying to read from the stream synchronously would either block the execution or not work as intended because the data might not be available immediately.
    */

    // iteriamo in modo asincrono su stdin, ma perché?
    // i dati arrivono in modo asincrono (es, potrebbe inserirli l'utente manualmente oppure possono arrivare da una pipe),
    // quindi non possiamo predirre quando la prossima porzione di dati sarà disponibile; provare a leggere in modo sincrono
    // bloccherebbe l'esecuzione oppure avremmo un comportamento inatteso poiché i dati non sarebbero immediatamente disponibili.
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}

// invochiamo hist() inizialmente, la quale restituisce un Promise
// f.then(g) permette di speficiare una funzione (detta funzione di callback) g
// che verrà invocata quando f termina ed avviene la risoluzione del Promise
hist().then(histogram => {
    console.log(histogram.toString());
});