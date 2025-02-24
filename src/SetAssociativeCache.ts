import { CacheSet } from "./CacheSet";

export enum ReplacementPolicy {
    LRU = "LRU",
    MRU = "MRU"
}

export class SetAssociativeCache<Key extends string | number, Value> {

    sets: CacheSet<Key, Value>[];
    numberOfSets: number;
    policy: ReplacementPolicy;

    // create cache with number of sets and lines
    constructor(numberOfSets: number, associativity: number, policy: ReplacementPolicy = ReplacementPolicy.LRU) {
        this.numberOfSets = numberOfSets;
        this.sets = Array.from({ length: numberOfSets }, () => new CacheSet<Key, Value>(associativity, policy));
        this.policy = policy;
    }

    private hashKey(input: number | string) : number {
        if (typeof input == "number"){
            //const x = 1.618; 
            const x = 1; 
            return (Number(input) * x | 0) % this.numberOfSets;
        } else {
            let hash = 0;
            for (let i = 0; i < input.length; i++) {
                hash = hash * 31 + input.charCodeAt(i);
            }
            return (hash >>> 0) % this.numberOfSets;    // positive 
        }
    }

    // hash function to identify a specific set 
    private getSetIndex(key: Key): number {
        let index = this.hashKey(key);
        return index;
    }

    // put value with specific key
    put(key: Key, value: Value | null) {
        this.sets[this.getSetIndex(key)].store(key, value);
    }

    // get value with specific key, null if not found
    get(key: Key): Value | null {
        let line = this.sets[this.getSetIndex(key)].load(key);
        if (line)
            return line.data;
        else
            return null;
    }

    // delete the key
    delete(key: Key): boolean {
        return this.sets[this.getSetIndex(key)].invalidate(key);
    }

    listAll(): { key: Key; value: Value | null }[] {
        return this.sets.flatMap(set => set.loadAll());
    }

    async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}