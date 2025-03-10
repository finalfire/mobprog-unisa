# Esercizi su JavaScript

### Esercizio 1: Creazione e Modifica di un Oggetto
Dichiara un oggetto `student` con le proprietà `name`, `age` e `course`. Modifica poi il valore di `course` e aggiungi una nuova proprietà `grade`.

```javascript
let student = {
    name: "Luca",
    age: 22,
    course: "Informatica"
};
student.course = "Matematica";
student.grade = 28;
console.log(student);
```

### Esercizio 2: Accesso agli Elementi di un Oggetto
Dichiara un oggetto `car` con le proprietà `brand`, `model` e `year`. Stampa il valore di `brand` e `year` utilizzando sia la notazione dot che la notazione bracket.

```javascript
let car = {
    brand: "Toyota",
    model: "Yaris",
    year: 2020
};
console.log(car.brand);  // Notazione dot
console.log(car["year"]);  // Notazione bracket
```

### Esercizio 3: Oggetto Vuoto e Aggiunta di Proprietà
Dichiara un oggetto vuoto `book` e aggiungi successivamente le proprietà `title`, `author` e `pages`.

```javascript
let book = {};
book.title = "Clean Code";
book.author = "Robert C. Martin";
book.pages = 464;
console.log(book);
```

### Esercizio 4: Verifica della Presenza di una Proprietà
Dichiara un oggetto `phone` con le proprietà `brand` e `model`. Verifica se la proprietà `price` esiste.

```javascript
let phone = {
    brand: "Samsung",
    model: "Galaxy S21"
};
console.log("price" in phone);  // false
```

---

## Slide 11: JavaScript - Array

### Esercizio 1: Accesso agli Elementi
Dichiara un array `colors` contenente i valori "red", "green" e "blue". Stampa il primo e l’ultimo elemento.

**Soluzione:**
```javascript
let colors = ["red", "green", "blue"];
console.log(colors[0]);  // "red"
console.log(colors[colors.length - 1]);  // "blue"
```

### Esercizio 2: Aggiunta e Rimozione di Elementi
Dichiara un array `fruits` e aggiungi "apple" e "banana". Rimuovi il primo elemento.

```javascript
let fruits = [];
fruits.push("apple", "banana");
fruits.shift();
console.log(fruits);
```

### Esercizio 3: Iterazione su un Array
Dichiara un array `numbers` con i valori `[10, 20, 30, 40]` e stampa ciascun valore utilizzando un ciclo `for`.

```javascript
let numbers = [10, 20, 30, 40];
for (let num of numbers) {
    console.log(num);
}
```

### Esercizio 4: Contare gli Elementi di un Array
Dichiara un array `cities` e stampa il numero di elementi.

```javascript
let cities = ["Roma", "Milano", "Napoli"];
console.log(cities.length);
```

---

## Slide 15: JavaScript - Funzioni come Parametri

### Esercizio 1: Passare una Funzione come Argomento
Scrivi una funzione `execute` che prende una funzione e un valore e restituisce il risultato della funzione applicata al valore.

```javascript
function execute(func, value) {
    return func(value);
}
console.log(execute(square, 6));  // 36
```

### Esercizio 2: Funzione di Callback
Scrivi una funzione repeatAction che accetta un'azione (funzione) e la esegue tre volte.

```javascript
function repeatAction(action) {
    for (let i = 0; i < 3; i++) {
        action();
    }
}
repeatAction(() => console.log("Eseguito!"));
```

---

## Esercizio 1: Controllo del Flusso - Simulazione di una Coda
Scrivi una funzione `processQueue` che simula una coda di utenti in attesa di essere serviti. La funzione accetta un array di nomi e li processa uno alla volta, stampando `Servendo [nome]...`. Se la coda è vuota, stampa `Nessun utente in attesa`.

**Soluzione:**
```javascript
function processQueue(queue) {
    if (queue.length === 0) {
        console.log("Nessun utente in attesa");
        return;
    }
    while (queue.length > 0) {
        let user = queue.shift();
        console.log(`Servendo ${user}...`);
    }
}
processQueue(["Alice", "Bob", "Charlie"]);
```

---

## Esercizio 2: OOP - Classe Conto Bancario
Crea una classe `BankAccount` che abbia i seguenti metodi:
- `deposit(amount)`: aggiunge denaro al saldo.
- `withdraw(amount)`: rimuove denaro se il saldo è sufficiente.
- `getBalance()`: restituisce il saldo attuale.

**Soluzione:**
```javascript
class BankAccount {
    constructor(owner, balance = 0) {
        this.owner = owner;
        this.balance = balance;
    }
    deposit(amount) {
        this.balance += amount;
        console.log(`Deposito di ${amount} effettuato.`);
    }
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Fondi insufficienti.");
            return;
        }
        this.balance -= amount;
        console.log(`Prelievo di ${amount} effettuato.`);
    }
    getBalance() {
        return `Saldo attuale: ${this.balance}`;
    }
}
let account = new BankAccount("Mario Rossi", 100);
account.deposit(50);
account.withdraw(30);
console.log(account.getBalance());
```

---

## Esercizio 3: OOP - Ereditarietà
Crea una classe `Person` con proprietà `name` e `age`, e un metodo `introduce()`. Poi crea una sottoclasse `Student` che eredita da `Person` e aggiunge una proprietà `course`. Sovrascrivi il metodo `introduce()` per includere il corso di studio.

**Soluzione:**
```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    introduce() {
        return `Ciao, mi chiamo ${this.name} e ho ${this.age} anni.`;
    }
}
class Student extends Person {
    constructor(name, age, course) {
        super(name, age);
        this.course = course;
    }
    introduce() {
        return `${super.introduce()} Studio ${this.course}.`;
    }
}
let student = new Student("Luca", 22, "Informatica");
console.log(student.introduce());
```

---

## Esercizio 4: Uso Avanzato di stdlib - Manipolazione Stringhe
Scrivi una funzione `capitalizeWords` che prende una stringa e restituisce la stessa stringa con ogni parola che inizia con una lettera maiuscola.

**Soluzione:**
```javascript
function capitalizeWords(sentence) {
    return sentence.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
console.log(capitalizeWords("ciao mondo, questa è una prova"));
```

---

## Esercizio 5: Uso Avanzato di stdlib - Generazione di Numeri Casuali
Scrivi una funzione `randomNumbers` che genera un array di `n` numeri casuali compresi tra un minimo e un massimo.

**Soluzione:**
```javascript
function randomNumbers(n, min, max) {
    return Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}
console.log(randomNumbers(5, 1, 100));
```