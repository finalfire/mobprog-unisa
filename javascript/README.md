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