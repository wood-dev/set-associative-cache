/**
 * Set – A group of N lines. 
 * The number of lines in a set is N 
 */

class CacheSet<Key extends string | number, Value> {

    lines: CacheLine<Key, Value>[];
    associativity: number;

    // create set with N lines 
    constructor(associativity: number) {
        this.associativity = associativity;
        this.lines = Array.from({ length: associativity }, () => new CacheLine<Key, Value>());
    }

    // load data with given key
    load(tag: Key): CacheLine<Key, Value> | null {
        let line = this.lines.find(line => line.valid && line.tag === tag);
        if (line) {
            line.lastAccessed = Date.now();
            return line;    // found
        }
        return null;        // not existed
    }

    // store data: update timestamp if exists; insert to empty line or victim line based on replacement policy
    store(tag: Key, data: Value | null) {

        let line = this.load(tag);

        if (line)
            line.store(tag, data, Date.now());        // update line if found
        else {

            let emptyLine = this.lines.find(line => !line.valid);       // find empty line
            if (emptyLine)
                emptyLine.store(tag, data, Date.now())
            else {
                let victimLine = this.lines.reduce((l1, l2) => (l1.lastAccessed < l2.lastAccessed ? l1 : l2));      // Least Recent Use: finding the oldest
                victimLine.store(tag, data, Date.now())
            }
        }
    }

    // set invalid 
    invalidate(tag: Key): boolean {
        let line = this.load(tag);
        if (line) {
            line.invalidate();
            return true;
        } else
            return false;
    }

    public loadAll(): { key: Key; value: Value | null}[] {
        return this.lines
            .filter(line => line.valid)         // valid only 
            .map(line =>({ key: line.tag!, value: line.data }));       // putting ! as key cannot be null 
    }

}
