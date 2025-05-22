import itemFactory from './item';

test("basic tests", () => {
   const i = itemFactory("thing");
   expect(i.name()).toBe("thing");
   expect(i.isItem).toBe(true);
});
