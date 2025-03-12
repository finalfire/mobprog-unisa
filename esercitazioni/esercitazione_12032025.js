/* Esercizio 1: Accesso agli Elementi
Dichiarare un array colors contenente i valori "red", "green" e "blue". Stampa il primo e l’ultimo elemento.*/
let colors = ["red", "green", "blue"];
console.log(colors);
console.log(colors[0]); // gli array sono zero-indexed (0...n-1)
let n = colors.length; // la size/lunghezza di questo array
console.log(colors[n - 1]);
console.log(colors[n]);
console.log(colors[1000000]);

let f = (x) => { x + 1 } // return x+1;

/*Esercizio 2: Aggiunta e Rimozione di Elementi
Dichiarare un array fruits e aggiungi "apple" e "banana". Rimuovi il primo elemento.*/
let fruits = ["strawberry"];
console.log("Array: " + fruits) // ["strawberry"]
fruits[fruits.length] = "apple";
console.log("Array: " + fruits) // ["strawberry", "apple"]
fruits[2] = "banana";
console.log("Array: " + fruits) // ["strawberry", "apple", "banana"]
fruits.push("lemon");
console.log("Array: " + fruits) // ["strawberry", "apple", "banana", "lemon"]
//fruits.push(["pineapple", "orange"]) // aggiunge all'array ["pineapple", "orange"] (un solo valore)
fruits.push("pineapple", "orange")

for (let i = 0; i < fruits.length; i++)
    console.log("Valore ad indice " + i + " = " + fruits[i]);

//fruits.push("pineapple", "orange") // aggiunre all'array prima "pineapple", e poi "orange" (due valori)
//console.log("Array: " + fruits) // ["strawberry", "apple", "banana", "lemon", "pineapple", "orange"]
//fruits.pop();
//console.log("Array: " + fruits)