class SetAssociativeCache<Key extends string | number, Value> {

    sets: CacheSet<Key, Value>[];
    numberOfSets: number;

    // create cache with number of sets and lines
    constructor(numberOfSets: number, associativity: number) {
        this.numberOfSets = numberOfSets;
        this.sets = Array.from({ length: numberOfSets }, () => new CacheSet<Key, Value>(associativity));
    }

    // hash function to identify a specific set 
    private getSetIndex(key: Key): number {
        const x = 1.618;
        return Number(key) * x % this.numberOfSets;           // even distribution
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
}