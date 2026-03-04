# Appunti JavaScript

## Equality e Inequality
L'operatore `===` viene detto *strict equality operator* (anche *identity operator*) e controlla se i due operandi sono identici, tramite una definizione di egualianza stringente:

1. Se i due valori hanno tipi differenti, non sono uguali.
2. Se entrambi i valori sono null oppure entrambi sono undefined, sono uguali.
3. Se entrambi i valori sono true oppure entrambi sono false, sono uguali.
4. Se uno dei due valori è `NaN`, non sono uguali.
5. Se entrambi i valori sono numeri e hanno lo stesso valore, sono uguali (vale anche per 0 e -0).
6. Se entrambi i valori sono stringhe e contengono gli stessi valori nelle stesse posizioni, sono uguali.
7. Se entrambi i valori si riferiscono allo stesso oggetto, array o funzione, sono uguali.

L'operatore `==` viene detto _equality operator_ e controlla se i due operandi sono uguali, tramite una definizione di egualianza più lasca:

1. Se entrambi gli operandi hanno lo stesso tipo, si applica la definuzione stringente di `===`.
2. Se gli operandi sono di tipo diverso, si controlla se:
    1. Se un valore è `null` e l'altro `undefined`, sono uguali.
    2. Se un valore è un numero e l'altro una stringa, si converte la stringa in numero e si riprova l'eguaglianza.
    3. Se uno dei valori è `true`, si converte in 1 e si riprova l'eguaglianza.
    4. Se uno dei valori è un oggetto e l'altro un numero o una stringa, si converte l'oggetto in tipo primitivo e si riprova l'eguaglianza.
    5. Altre combinazioni, non sono uguali.

## Array

```javascript
let undefs = [,,];  // Un array senza elementi ma con length 2

let a = [1,2,3];
let b = [0, ...a, 4]; // ... viene chiamato spread operator e "spalma" gli elementi di a in b => [0,1,2,3,4]

// best practice per creare una shallow copy di un array
let original = [1,2,3];
let copy = [...original];
copy[0] = 1;    // solo copy è modificato

// rimuovere duplicati da un array
let dups = [1,1,3,4,2,8,8,2];
let noDups = [..new Set(dups)];     // => [1,3,4,2,8]

a = new Array();    // array vuoto, equivalente a []
a = new Array(10);  // array di length 10
a = new Array(2,3,4);   // [2,3,4]
Array.of()      // => []
Array.of(1,2,3) // => [1,2,3]
b = Array.from(a)   // restituisce un nuovo array con gli elementi di a

// l'operatore `in` controlla gli indici
let x = [1,2,3];
0 in x  // => true

// .push() aggiunge un elemento alla fine, modificando l'array
let y = [];
y.push("x");    // y = ["x"]

// iterare su coppie (indice, valore)
for (let [i, value] of x.entries()) {
    console.log(`Indice: ${i}, valore: ${value}`);
}

// forEach accetta una funzione il cui argomento sarà il valore corrente
x.forEach(value => console.log(value));


// "to flat" un array significa eliminare la dimensione (ad esclusione della prima) più interna
[1, [2,3]].flat()   // => [1,2,3]

// concatenare array
let e = [1,2,3];
e.concat([4,5])     // => [1,2,3,4,5]

// la combinazione di push() e pop() permette di
// utilizzare gli array come delle pile
let stack = [];
stack.push(1,2);    // stack == [1,2]
stack.pop();        // stack = [1]; restituisce 2

// una cosa può essere implementata utilizzando shift()
let queue = [];
queue.push(1,2);
queu.shift();       // queue = [2]; restituisce 1

// slice() restituisce una porzione contigua dell'array (anche detta, per l'appunto, slice)
let f = [1,2,3,4,5];
f.slice(0,3)    // => [1,2,3]

// splice() rimuove un elemento da un array, inserisce nuove elementi o entrambe le cose
let g = [1,2,3,4,5,6,7,8];
g.splice(4)     // => [5,6,7,8]; g = [1,2,3,4]
g.splice(1,2)   // => [2,4]; g = [1,4]

// fill() modifica ogni elemento di un array o di una slice con il valore dato
let h = new Array(5);
h.fill(2)       // [2,2,2,2,2]

// sort() ordina un array in modo LESSICOGRAFICO crescente; accetta anche una funzione di comparazione, la quale accetta due elementi e restituisce un valore < 0 se il primo è minore del secondo, > 0 se il primo è maggiore del secondo, altrimenti 0
let a = [33, 4, 1111, 222];
a.sort()                // => [1111, 222, 33, 4]
a.sort((x,y) => x-y)    // => [4, 33, 222, 1111]

// dato un array di stringhe, a.join(c) crea una stringa in cui gli elementi di a sono riportati delimitati dal carattere c (di default una virgola)
let a = [1, 2, 3];
a.join()    // => "1,2,3"
```

## Something something functional-ish
```javascript
// Il metodo map() si invoca su di un iterable, accetta una funzione il cui parametro sarà il valore corrente dell'iterable, e restituisce un nuovo array
let a = [1,2,3];
a.map(x => x*x) // => [1,4,9]

// Il metodo filter() restituisce un sottoinsieme di elementi dell'iterable su cui è invocato. Accetta una funzione il cui parametro sarà il valore corrente dell'iterable, e la funzione deve essere un predicato (restituire true o false)
let b = [2,5,4,7,8,6,2];
b.filter(x =>  x % 2 === 0) // => [2,4,8,6,2]

// find() e findIndex()
let c = [1,4,6,6,5];
c.find(x => x % 2 === 0)    // => 4
c.findIndex(x => x === 6)   // => 2

// every() e some() sono predicati che si applicano sugli array
// every() è equivalente alla semantica del quantificatore for all/per ogni: restituisce true se il predicato è vero per tutti gli elementi dell'array;
// some() è equivalente alla semantica del quantificatore esistenziale: restituisce true se il predicato è vero per almeno un elemento dell'array
let d = [1,2,3,4,5];
a.every(x => x < 10)    // => true
a.some(x => x === 8)    // => false

// Processare gli array tramite funzioni
let data = [1,1,3,5,5];
// calcolare media e stddev
const sum = (x,y) => x+y;
const square = x => x*x;

// reduce() applica la funzione sum al primo argomento e al resto dell'array, poi al risultato ottenuto e alla parte restante, etc...
let mean = data.reduce(sum) / data.length; // mean = 3
let deviations = data.map(x => x - mean);
let stddev = Math.sqrt(deviations.map(square).reduce(sum) / (data.length - 1));
```

## Funzioni

- Vi è una importante differenza tra definire una funzione tramite una function declaration e una function expression, ovvero nel primo caso la funzione è creata prima che il codice contenuto in essa venga eseguito, mentre nel secondo caso la funzione esiste solo al momento della sua esecuzione

```javascript
// function declaration
function sum(a,b) {
    return a + x;
}

// function expression
const squre = function(x) { return x * x; };
```

- Le funzioni possono essere aggiunte tramite uno shorthand ad object literal

```javascript
let calc = {
    operand1: 1,
    operand2: 1,
    add() {
        this.result = this.operand1 + this.operand2;
    }
};
calc.add();
calc.result     // => 2
```

- Se una funzione restituisce un oggetto, allora si può usare il valore restituito per invocare un suo metodo: questa pratica viene detta *method chaining*

```javascript
let x = new Square().x(100).y(100).size(50).fill("blue");
```

- Se una funzione viene invocata con un numero di parametri minore di quelli dichiarati, ai parametri restanti viene assegnato il loro valore di default (di solito `undefined`)

```javascript
function getProps(o, a = []) { // a = [] indica il valore di default per a nel caso in cui getProps sia invocata senza la sua specifica
	for (let p in o)
		a.push(p);
	return a;
}

let o = {x: 1, y: 2};
let a = getProps(o);
getProps(o, a)
```

- Possiamo scrivere funzioni che possano essere invocate con un numero arbitrario di parametri, utilizzando l'operatore spread

```javascript
function sum(a,b,...rest) {
    let sum = a + b;
    for (let n of rest)
        sum += n;
    return sum;
}

sum(1,2)        // => 3
sum(1,2,3,4)    // => 10
```

- Le funzioni in JS non sono valori primitivi ma speciali tipi di oggetti. Le proprietà di una funzione sono dei valori che appartengono alla funzione stessa, e sono condivisi tra le invocazioni:

```javascript
myInt.counter = 0;
function myInt() {
    return myInt.counter++;
}
myInt()     // => 0
myInt()     // => 1

// Compute factorials and cache results as properties of the function itself.
function factorial(n) {
    if (Number.isInteger(n) && n > 0) {
        if (!(n in factorial)) {
            factorial[n] = n * factorial(n-1);
        }
        return factorial[n];
    } else {
        return NaN;
    }
}
factorial[1] = 1; // Initialize the cache to hold this base case.
factorial(6) // => 720
factorial[5] // => 120; the call above caches this value
```

- Il punto precedente può essere rappresentato anche tramite una closure; una closure è la combinazione di una oggetto funzione e lo scope (l'insieme di binding di variabili) in cui le variabili della funzione sono valutate

```javascript
let myInt = (function() {
    let counter = 0;
    return function() { return counter++; };
})
myInt()     // => 0
myInt()     // => 1
```

## Try/catch/finally

```javascript
try {
    /*  Questo codice potrebbe lanciare un'eccezione, sia direttamente
        tramite l'istruzione throw, sia indirettamente, invocando un
        metodo che lanci un'eccezione.  */
} catch(e) {
    /*  Le istruzioni in questo blocco sono eseguite sse il blocco
        try lancia un'eccezione; la variabile locale e si riferisce
        ad un oggetto di tipo Error o al valore che è stato lanciato
        dall'eccezione. */
} finally {
    /*  Le istruzioni di questo blocco sono sempre eseguite,
        indipendentemente da cosa accade nel blocco try.    */
}
```

## import/export

Le dichiarazioni `import` e `export` si usano per rendere disponibili valori definiti in un modulo di codice JS per un altro modulo. Un **modulo** è un file JS con un namespace proprio, indipendente da tutti gli altri moduli. L'unico modo affinché un valore definito in un modulo X possa essere usato in un modulo Y è se X esporta il valore con `export` e Y importa il valore con `import`.

```javascript
/// file main.js
import Circle from './geometry/circle.js';

/// file geometry/constants.js
const PI = Math.PI;
const TAU = 2 * PI;
export { PI, TAU };
```

## Creazione di oggetti
- Un oggetto creato `{}` viene detto _object literal_.
- Un oggetto creato con `new f()` generalmente ha una classe associata.
- Quasi tutti gli oggetti in JS hanno un secondo oggetto associato ad essi, e viene chiamato **prototipo**. Il primo oggetto eredita le proprietà dal prototipo.
    - Es, gli oggetti creati da `new Array()` usano `Array.prototype` come loro prototipo.
- Con `Object.create(o)` si crea un oggetto avente `o` come prototipo.

## Varie
- In modern JS (da ES6 in poi) si utilizza `let` per dichiarare le variabili. `var` porta con se diverse differenze, es ha function scope invece del block scope
    - Cosa significa? Che se ho diversi cicli `for` nello stesso blocco, posso usare `for (var i = ...)` tante volte senza problemi.
- Destrutturazione
```javascript
const f = (a,b) => {
    return [a+b, a-b];
}
let [x,y] = f(0,1);
let [x, ...y] = [1,2,3,4];  // y == [2,3,4]
```
- La comparazione tra due oggetti è fatta per riferimento, non per valore.
```javascript
let y = [2,3,4];
y == [2,3,4]    // => false 
```
- L'operatore `+` funziona come segue:
    1. Se uno dei due operandi è un oggetto, viene convertito in un tipo primitivo. Oggetti `Date` sono convertiti tramite il metodo `toString()`, mentre gli altri oggetti sono convertiti tramite `valueOf()`. In pratica, non tutti gli oggetti implementano un `valueOf()` quindi saranno comunque convertiti tramite `toString()`.
    2. Dopo la conversione, se uno dei due operandi è una stringa, l'altro è convertito in stringa e si effettua la concatenazione.
    3. Altrimenti, entrambi gli operandi sono convertiti in numeri (oppure `NaN`) e si effettua l'addizione.
- È possibile usare il `do { ... } while(condition);`.
- Il `for/of` utilizzato su di un oggetto itera sulle sue proprietà:
```javascript
let o={x:1,y:2,z:3};
let keys = "";
for(let k of Object.keys(o)) {
    keys += k;
}
keys // => "xyz"
```
- Gli oggetti in JS sono array associativi (equivalenti ad hashmap o dizionari in altri linguaggi di programmazione)
```javascript
let o = {a: 1, b: 2};
o.a     // => 1
o['a']  // => 1, nota bene: la proprietà è espressa come stringa
```
- Possiamo rimuovere una proprietà `x` di un oggetto `o` tramite `delete o.x;`
- Per capire se un oggetto `o` abbia una certa proprietà `x`, possiamo usare `"x" in o`, il quale viene valutato `true` nel caso in cui la proprietà esista per l'oggetto (definita direttamente o eriditata).
    - `o.hasOwnProperty("x")` restituisce `true` se `x` è una proprietà definita direttamente (quindi non ereditata).
- Enumerare le proprietà di un oggetto è cosa buona e giusta:
```javascript
let o = {x: 1, y: 2, z: 42};
for (let p in o) {
    console.log(p);
}
```
- Per ottenere la rappresentazione JSON di un oggetto si utilizza `JSON.stringify()`, il quale prende un oggetto e utilizza il metodo `toJSON` per la rappresentazione. Quest'ultimo deve essere implementato, se non già disponibile.