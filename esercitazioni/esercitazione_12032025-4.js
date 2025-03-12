// scrivere una funzione che prenda una stringa s e analizzi la
// frequenza dei simboli all'interno di s; la funzione deve restituire
// un oggetto i cui campi sono tutti i simboli presenti in s e il valore di un campo
// è quante volte appare quel simbolo in s
function f(s) {
    let frequency_map = {};
    // scorro => ciclo => itero su ogni carattere di s (stringa ~= array)
    // se ho un carattere c: c sta dentro la frequencymap? se sì => aggiungo 1 al suo valore
    // step 1: iterare su s
    for (let i = 0; i < s.length; i++) {
        // step 2: mi prendo il carattere ad indice i, e controllo se esso appartiene già alla frequency_map
        let character = s[i];
        if (frequency_map[character] !== undefined) {
            // questo indica che character l'ho già incontrato durante l'iterazione
            // su s; ergo, character ha una frequenza maggiore di 0
            frequency_map[character] += 1;
        } else {
            // se sono qui, prima non ho incontrato character e quindi ora posso dire
            // che ha almeno una occorrenza
            frequency_map[character] = 1;
        }
    }

    return frequency_map;
}

// fm è la nostra frequency map
function graph(fm) {
    // step 0.1: mi creo un array con tutti i campi (caratteri) che stanno
    // nella frequency map
    let character_array = [];
    for (const character in fm)
        character_array.push(character);
    // step 0.2: faccio un sort di questo array basato
    // sul valore che un character ha in fm
    // in sort posso anche passare una funzione anonima che prende in input due valori
    // (che sono due valori contigui nell'array originale) e indica come ordinarli
    character_array.sort((x,y) => {
        // se i due caratteri hanno lo stesso valore in fm
        if (fm[x] === fm[y]) {
            if (x < y) return -1;
            return 1;
        }

        if (fm[x] <= fm[y])
            return 1;
        return -1;
    });

    // step 1: itero su tutti i caratteri della frequency map
    //for (const character in fm) {
    for (let character of character_array) {
        let frequency = fm[character];
        // step 2: creo una stringa che contiene tanti # quanto vale fm[character]
        let count_str = "";
        for (let i = 0; i < frequency; i++)
            count_str += "#";
        // step 3: scrivi su standard output la rappresentazione completa
        console.log(character + ": " + count_str + " (" + frequency + ")");
    }
}

let pippo = f("Ciao siamo dei programmatori eccellenti!");
graph(pippo);