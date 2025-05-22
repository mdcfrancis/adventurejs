import bagFactory from './bag';
import itemFactory from './item';

test("basic tests", () => {
   const b = bagFactory("bag");
   expect(b.name()).toBe("bag");
   expect(b.isItem).toBe(true);
   expect(b.isBag).toBe(true);
   expect(b.size()).toBe(0);
});

test("stash", () => {
   const b = bagFactory("bag");
   const i = itemFactory("thing");
   expect(b.stash(i)).toBe(null);
   expect(b.size()).toBe(1);
   expect(b.includes("thing")).toBe(true);
});

test("fetch", () => {
   const b = bagFactory("bag");
   const i = itemFactory("thing");
   expect(b.stash(i)).toBe(null);
   expect(b.size()).toBe(1);
   expect(b.includes("thing")).toBe(true);
   const j = b.fetch("thing");
   expect(j).not.toBe(null);
   expect(j?.name()).toBe("thing");
   expect(b.size()).toBe(0);
   expect(b.includes("thing")).toBe(false);
});

test("items", () => {
   const b = bagFactory("bag");
   const i = itemFactory("thing");
   const j = itemFactory("other");
   expect(b.stash(i)).toBe(null);
   expect(b.stash(j)).toBe(null);
   expect(b.size()).toBe(2);
   expect(b.items()).toStrictEqual(["thing", "other"]);
});

test("full", () => {
   const b = bagFactory("bag", 2);
   const i = itemFactory("thing");
   const j = itemFactory("other");
   const k = itemFactory("more");
   expect(b.stash(i)).toBe(null);
   expect(b.stash(j)).toBe(null);
   expect(b.stash(k)).not.toBe(null);
   expect(b.size()).toBe(2);
   expect(b.items()).toStrictEqual(["thing", "other"]);
});
