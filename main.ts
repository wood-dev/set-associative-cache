import { SetAssociativeCache } from "./src/SetAssociativeCache";



// Create a cache with 4 sets and 2-way associativity
const cache = new SetAssociativeCache<number, string>(4, 4);

// Insert some values
cache.put(1, "One");
cache.put(2, "Two");

