import { SetAssociativeCache } from "../src/SetAssociativeCache";

describe("SetAssociativeCache", () => {

    const cache = new SetAssociativeCache<string, string>(4, 4);

        test("accessing values", () => {
            cache.put("A", "One");
            cache.put("B", "Two");

            expect(cache.get("A")).toBe("One");
            expect(cache.get("B")).toBe("Two");
        });


        test("lists values", () => {
            cache.put("A", "One");
            cache.put("B", "Two");

            cache.delete("B");

            expect(cache.get("B")).toBe(null);
        });

});