// in JS le funzioni sono first-class citizen
// che le funzioni possono essere considerate dei "valori"
function sum(a, b) {
    return a + b;
}
let sumAr = (a,b) => a + b;

let printAndSum = (a,b) => {
    console.log("a = " + a + " b = " + b);
    return a + b;
}

let pippo = sum;
console.log(pippo(4,5)); // 9
let one = function() { return 1; }
console.log(sum(one(), 4)); // 5






let wrapper = function(valore, f) {
    return f(valore);
}

let addOne = function(x) { return x + 1; }
let addOneAr = x => x + 1;
let risultato = wrapper(27, addOne);
console.log(risultato);