/*### Esercizio 4: Verifica della Presenza di una Proprietà
Dichiarare un oggetto `phone` con le proprietà `brand` e `model`. Verifica se la proprietà `price` esiste.*/

// checkField(f,o) restituisce true se il campo f è presente nell'oggetto o
function checkField(f,o) {
    if (o[f] !== undefined)
        return true;
    return false;
}

let phone = {
    brand: "Apple",
    model: "iPhone 12",
    space: "256 GB"
};

let fields = ['price', 'memory', 'space'];
for (let field of fields) {
    if (checkField(field, phone))
        console.log("Il campo " + field + " è presente nell'oggetto phone con valore" + phone[field])
    else
        console.log("Il campo " + field + " NON è presente nell'oggetto phone.")
}