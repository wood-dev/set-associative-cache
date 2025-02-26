import { ReplacementPolicy, SetAssociativeCache } from "./src/SetAssociativeCache";



// Create a cache with 4 sets and 2-way associativity

const cache = new SetAssociativeCache<number, string>(4, 2);

cache.put(1, "One");
cache.put(2, "Two");
cache.put(3, "Three");
cache.put(4, "Four");
cache.put(5, "Five");
cache.put(6, "Six");
cache.put(7, "Seven");
cache.put(8, "Eight");
cache.put(9, "Nine");
cache.put(10, "Ten");

console.log("get 1", cache.get(1));
console.log("show all", cache.listAll());

/*
const cache = new SetAssociativeCache<string, string>(4, 2);

cache.put("1", "One");
cache.put("2", "Two");
cache.put("3", "Three");
cache.put("A", "Three");
cache.put("B", "Three");
cache.put("ABC", "Three");
console.log("show all", cache.listAll());
*/
/*
type TestingObject = { id: number; name: string; description: string };
const cache2 = new SetAssociativeCache<number, TestingObject>(4, 2);
cache2.put(1, {id:1, name:"test", description: 'content'});
console.log("show all", cache.listAll());
*/

/*

console.log("get key 1:", cache.get(1)); 
console.log("get key 2:", cache.get(2)); 

cache.put(1, "Another One");
console.log("get another key 1:", cache.get(1)); 


console.log("show all", cache.listAll());

cache.delete(2);
console.log("get key 2:", cache.get(2)); 

console.log("show all", cache.listAll());
*/