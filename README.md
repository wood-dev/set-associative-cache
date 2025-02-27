# SetAssociativeCache

An efficient **n-way set associative cache** implementation for JavaScript and TypeScript. 

- **Configurable number of sets and ways**
- **Configurable replacement policy (LRU and MRU)**
- **Supports both primitive and custom object values**

---

# Installation

For local use

```sh
npm link set-associative-cache
```

Alternatively, Once it's registered on npmjs

```sh
npm install set-associative-cache
```

---

# Usage

## **Primitive Key and Value**

```ts
import SetAssociativeCache from "set-associative-cache";
const cache = new SetAssociativeCache<number, string>(3, 4);

cache.put(1, "One");
cache.put(2, "Two");
cache.put(3, "Three");
cache.put(4, "Four");

console.log("get 1", cache.get(1));         // "One"
console.log("show all", cache.listAll());   // show all content

console.log("delete 2", cache.delete(2));   // true
console.log("get 2", cache.get(2));         // null
console.log("show all", cache.listAll());   // show all content
```

## **Primitive Key and Value in Custom Types**

```ts
type TestingObject = { id: number; name: string; description: string };
const cache2 = new SetAssociativeCache<number, TestingObject>(4, 2);
cache2.put(1, {id:1, name:"test", description: 'content'});
console.log("show all", cache.listAll());
```

---

# API Reference

## **Constructor**

```ts
new SetAssociativeCache<Key, Value>(numberOfSets: number, associativity: number, policy: ReplacementPolicy = ReplacementPolicy.LRU);
```

- `numberOfSets`: Number of sets in the cache.
- `associativity`: Number of ways per set.
- `policy`: Replace Policy with possible options LRU and MRU (default set to LRU).

## **Methods**

| Method            | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `put(key, value)` | Put a key-value pair to the cache.                       |
| `get(key)`        | Get a value from the cache. Returns `null` if not found. |
| `delete(key)`     | Delete a key-value pair from the cache.                  |
| `loadAll()`       | Returns all cached records as an array.                  |

---

# Contributing

Contributions can be done through [GitHub](https://github.com/yourusername/set-associative-cache).

---

# Change Log

## v1.0.0 - Initial Release

- Implemented set-associative caching with configurable sets and ways.
- Added LRU and MRU replacement policy.
- Implemented basic API methods: set, get, delete, loadAll.
