import { ReplacementPolicy, SetAssociativeCache } from "../src/SetAssociativeCache";

describe("SetAssociativeCache", () => {

        test("LRU", async () => {

            const cache = new SetAssociativeCache<number, string>(4, 2, ReplacementPolicy.LRU);
            cache.put(1, "One");
            await cache.delay(1);
            cache.put(2, "Two");
            await cache.delay(1);
            cache.put(3, "Three");
            await cache.delay(1);
            cache.put(4, "Four");
            await cache.delay(1);
            cache.put(5, "Five");
            await cache.delay(1);
            cache.put(6, "Six");
            await cache.delay(1);
            cache.put(7, "Seven");
            await cache.delay(1);
            cache.put(8, "Eight");
            await cache.delay(1);
            cache.put(9, "Nine");
            await cache.delay(1);
            cache.put(10, "Ten");
            expect(cache.get(1)).toBe(null);
            expect(cache.get(2)).toBe(null);
            expect(cache.get(3)).toBe("Three");
            expect(cache.get(4)).toBe("Four");
            expect(cache.get(5)).toBe("Five");
            expect(cache.get(6)).toBe("Six");
            expect(cache.get(7)).toBe("Seven");
            expect(cache.get(8)).toBe("Eight");
            expect(cache.get(9)).toBe("Nine");
            expect(cache.get(10)).toBe("Ten");
        });

        test("MRU", async () => {

            const cache = new SetAssociativeCache<number, string>(4, 2, ReplacementPolicy.MRU);
            cache.put(1, "One");
            await cache.delay(1);
            cache.put(2, "Two");
            await cache.delay(1);
            cache.put(3, "Three");
            await cache.delay(1);
            cache.put(4, "Four");
            await cache.delay(1);
            cache.put(5, "Five");
            await cache.delay(1);
            cache.put(6, "Six");
            await cache.delay(1);
            cache.put(7, "Seven");
            await cache.delay(1);
            cache.put(8, "Eight");
            await cache.delay(1);
            cache.put(9, "Nine");
            await cache.delay(1);
            cache.put(10, "Ten");
            expect(cache.get(1)).toBe("One");
            expect(cache.get(2)).toBe("Two");
            expect(cache.get(3)).toBe("Three");
            expect(cache.get(4)).toBe("Four");
            expect(cache.get(5)).toBe(null);
            expect(cache.get(6)).toBe(null);
            expect(cache.get(7)).toBe("Seven");
            expect(cache.get(8)).toBe("Eight");
            expect(cache.get(9)).toBe("Nine");
            expect(cache.get(10)).toBe("Ten");
        });


        test("String Key", () => {

            const cache = new SetAssociativeCache<string, string>(4, 2);

            cache.put("A", "One");
            cache.put("B", "Two");
            cache.delete("B");
            expect(cache.get("B")).toBe(null);
        });

});