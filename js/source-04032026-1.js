// Dichiarare un oggetto student con le proprietà name, age e course.
// Modifica poi il valore di course e aggiungi una nuova proprietà grade.

let student = {
    name: "Francesco",
    age: 36,
    course: "Mobile Programming"
}

let student2 = {};

console.log(student.name);
console.log(student.score);
student.course = "Algoritmi e Strutture Dati";
student.score = 30;
console.log(student.course);
console.log(student.score)
console.log(student["course"]);
console.log(student2);
student2.nome = "Marco";
console.log(student2);

if (student2.age == undefined)
    console.log("Non esiste la proprietà age per student2");