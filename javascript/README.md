# Appunti JavaScript

- In modern JS (da ES6 in poi) si utilizza `let` per dichiarare le variabili. `var` porta con se diverse differenze, es ha function scope invece del block scope
    - Cosa significa? Che se ho diversi cicli `for` nello stesso blocco, posso usare `for (var i = ...)` tante volte senza problemi.
- Destrutturazione
```javascript
const f = (a,b) => {
    return [a+b, a-b];
}
let [x,y] = f(0,1);
```