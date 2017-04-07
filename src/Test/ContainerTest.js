import ListLinkedDouble from "../Structures/ListLinkedDouble";
import ListItemDouble from "../Structures/ListItemDouble";

import XArray from "../Structures/XArray";
import MArray from "../Structures/MArray";
import Console from "../UI/Console";

//======================================================================
let fruits = new XArray(
    "Cherry", "Apple", "Plum", "Orange", "Lemon",
    "Mango",
    //"Strawberry", "Pear", "Kiwi", "Melone",
);

function listFromArray(arrayOfNames) {
    let list = new ListLinkedDouble();
    fruits.forEach( fruit => { list.tail = fruit; } );
    Console.log("List from XArray: " + list.toString());
    Console.log("should be: " + arrayOfNames.join(", ") + "\n\n");
    return list;
}

function findItemTest(list, itemName) {
    Console.log("contains " + itemName + ": " + fruits.some((n) => n===itemName));
    let result = list.some((item) => itemName === item);
    Console.log("should be: " + result + "\n\n");
}

function removeTest(list: ListLinkedDouble, itemName: string) {
    Console.log("remove: " + itemName);
    Console.log("from: " + list.toString());
    list.remove(itemName);
    Console.log("results in: " + list.toString());
    fruits = fruits.without(itemName);
    Console.log("should be: " + fruits.join(", ") + "\n\n");
}

function insertTest(list: ListLinkedDouble, itemName: string) {
    list.insertBefore(itemName);
    Console.log("insertBefore: " + itemName);
    Console.log("results in: " + list.toString());
    fruits = fruits.insertBefore(itemName);
    Console.log("should be: " + fruits.join(", ") + "\n\n");
}

//======================================================================
let fruitsList = listFromArray(fruits);

findItemTest(fruitsList, "Apple");
findItemTest(fruitsList, "Papaya");

removeTest(fruitsList, "Mango");
removeTest(fruitsList, "Cherry");
removeTest(fruitsList, "Orange");
removeTest(fruitsList, "Lemon");

insertTest(fruitsList, "Orange");
insertTest(fruitsList, "Ananas");
insertTest(fruitsList, "Peaches");


//======================================================================
let mArray = new MArray(1,2,3,4,5,6);
Console.log(mArray.tail);

//======================================================================
if (window) Object.assign(window.MICAGE = window.MICAGE || {}, {
    fruits,
    fruitsList,
    mArray
});
