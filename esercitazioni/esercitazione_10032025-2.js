let punto = {
    x: 10,
    y: 11
};

// aggiungere un metodo a questo oggetto punto
punto.somma = function() {
    return this.x + this.y;
}
// punto.somma = () => this.x + this.y;

console.log(punto);
console.log(punto.somma());

for (Object o: collection)