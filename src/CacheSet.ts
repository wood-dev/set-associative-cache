import { CacheLine } from "../src/CacheLine";
import { ReplacementPolicy } from "./SetAssociativeCache";

/**
 * Set – A group of N lines. 
 * The number of lines in a set is N 
 */

export class CacheSet<Key extends string | number, Value> {

    lines: CacheLine<Key, Value>[];
    associativity: number;
    policy: ReplacementPolicy;

    // create set with N lines 
    constructor(associativity: number, policy: ReplacementPolicy) {
        this.associativity = associativity;
        this.lines = Array.from({ length: associativity }, () => new CacheLine<Key, Value>());
        this.policy = policy;
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
                let victimLine = this.getVictimLine();
                victimLine.store(tag, data, Date.now())
            }
        }
    }

    getVictimLine(){
        let victimLine;
        switch (this.policy) {
            case ReplacementPolicy.LRU:
                victimLine = this.lines.reduce((l1, l2) => (l1.lastAccessed < l2.lastAccessed ? l1 : l2));      // find the oldest
                break;
            case ReplacementPolicy.MRU:
                victimLine = this.lines.reduce((l1, l2) => (l1.lastAccessed > l2.lastAccessed ? l1 : l2));      // find the newest
                break;
            default:
                victimLine = this.lines.reduce((l1, l2) => (l1.lastAccessed < l2.lastAccessed ? l1 : l2));      // default as LRU
                break;
        }
        return victimLine;
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
