"use strict";

// import LinkedListDouble from "../Structures/LinkedListDouble"
// import "./ArraysToTest"
const ListLinkedDouble = require("../Structures/ListLinkedDouble");

// const fruits = [
//     "Cherry", "Apple", "Plum", "Orange", "Lemon",
//     "Mango",
//     "Pear", "Kiwi", "Melone", "Fig",
//     "Raspberry", "Blueberry", "Strawberry",
//     "Grape"
// ];

let list = new ListLinkedDouble();
list.head = "Cherry";
list.head = "Apple";
list.head = "Plum";
list.tail = "Orange";
list.remove("Lemon");
list.remove("Mango");
console.log(list.toString());

// =========================================================

let list2 = new ListLinkedDouble();
list2.tail = "Mango";
list2.tail = "Apple";
list2.tail = "Ananas";
list2.tail = "Orange";
list2.tail = "Lemon ";
console.log(list2.toString());

let mango = list2.some((obj) => obj === "Mango");
console.log(mango);

// get a list of words starting with "A"
let list2a = list2.filter(obj => obj[0] === "A");
console.log(list2a.toString());

console.log(list2.toArray());

list2.insertAfter("Banane", "Ananas");
console.log(list2.toString());

list2.tail = list2.head;
console.log(list2.toString());

let fruit = list2.pop();
console.log(fruit);



//==============================================================================
if (module.hot) {
    module.hot.accept();
}
