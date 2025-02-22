/**
 * Line (Block) – The smallest unit of storage in the cache. 
 * Each block stores both data and metadata (like a tag and valid bit).
 */


class CacheLine<Key extends string | number, Value> {

    tag: Key ;        // memory block tag
    data: Value | null;     // data
    valid: boolean;         // valid bit
    lastAccessed: number;   // for replacement policy

    constructor() {
        this.data = null;
        this.valid = false;
        this.lastAccessed = 0;
    }

    // store the cache line 
    store(tag: Key, data: Value | null, currentTime: number) {
        this.tag = tag;
        this.data = data;
        this.valid = true;
        this.lastAccessed = currentTime;
    }

    // invalidate the cache line
    invalidate() {
        this.data = null;
        this.valid = false;
    }
}
