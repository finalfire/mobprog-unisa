let parsingStringa = (s, counter) => {
    s = s.toUpperCase();    // TAVVOLO
    // .replace() rimpiazzia solo la prima occorrenza
    // .replaceAll() rimpiazzia tutte le occorrenze
    s = s.replaceAll(' ', ''); // TAVVOLONONVO\nENEANCHEGLIACCAPO
    s = s.replaceAll('\n', '');// TAVVOLONONVOENEANCHEGLIACCAPO

    for (let i = 0; i < s.length; i++) {
        if (counter[s[i]] === undefined)
            counter[s[i]] = 1;
        else
            counter[s[i]] = counter[s[i]] + 1;
    }
}

const calcolaIstogramma = (counter) => {
    // numero totale di caratteri letti
    let numCar = 0;
    for (let carattere in counter)
        numCar = numCar + counter[carattere];
    console.log("num caratteri totali: " + numCar);

    for (let carattere in counter) {
        let perc = (counter[carattere] / numCar) * 100;
        // .toFixed(k) = mantiene i k valori dopo la virgola
        perc = perc.toFixed(2);
        // s.repeat(k) = ripete s per k volte
        let barra = "#".repeat(Math.round(perc));
        console.log(carattere + ": " + barra + " " + perc + "%");
    }
}

async function istogramma() {
    let counter = {};
    process.stdin.setEncoding("utf-8");
    for await (let riga of process.stdin) {
        parsingStringa(riga, counter);
    }
    calcolaIstogramma(counter);
}

istogramma()