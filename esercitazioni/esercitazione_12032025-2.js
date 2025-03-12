/*Esercizio 1: Passare una Funzione come Argomento
Scrivere una funzione execute che prende una funzione e un valore e restituisce il risultato della funzione applicata al valore.*/
// let execute = (f,a) => { f(a) };
// qui posso passare f come parametro perché in JS le funzioni sono
// considerate first-class citizen (quindi sono semplici valori)
let execute = (f,a) => {
    return f(a);
}

function doppio(a) {
    return 2 * a;
}

let risultato1 = execute(doppio, 21);
let risultato2 = execute(doppio, 13);
console.log(risultato1);
console.log(risultato2);

/*Esercizio 2: Funzione di Callback
Scrivere una funzione repeatAction che accetta un'azione (funzione) e la esegue tre volte.*/
function repeatAction(f, a) {
    f(a);
    f(a);
    f(a);
}

// questa arrow function è anche una funzione anonima
repeatAction((x) => { console.log(x); }, "ciaooo");

let notAnonymous = () => { console.log("Ciao"); }
repeatAction(notAnonymous);

let stampaValore = function(valore) {
    console.log(valore);
}
repeatAction(stampaValore, "blablalba");