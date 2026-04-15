function aggiungiUno(n) {
    return n + 1;
}
// arrow function
let aggiungiUnoSemplice = (n) => n + 1;

function sumAndProd(a,b) {
    let sum = a + b;
    let prod = a * b;
    return [sum, prod];
}

let sumAndProdSemplice = (a,b) => {
    let sum = a + b;
    let prod = a * b;
    return [sum, prod];
}

// scrivere una funzione che prenda due numeri n e m e una operazione
// da effettuare su di essi; le operazioni possbili sono somma e prodotto
function calcola(n, m, operazione) {
    if (operazione === "somma") {
        return n + m;
    } else if (operazione === "prodotto") {
        return n * m;
    }
}

function calcolaFunzionale(n, m, op) {
    return op(n, m);
}

// vogliamo fare la somma
calcolaFunzionale(1, 2, (a,b) => a + b);

// vogliamo fare il prodotto
calcolaFunzionale(1, 2, (a,b) => a * b);

// vogliamo fare la divisione
calcolaFunzionale(1, 2, (a,b) => a / b);

function esponenziazione(base, esponente) {
    if (esponente === 0) {
        return 1;
    } else {
        return base * esponenziazione(base, esponente - 1);
    }
}

calcolaFunzionale(2, 8, esponenziazione);

let punto = {
    x: 1, y: 2
};

punto.magnitudo = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

punto.magnitudo();