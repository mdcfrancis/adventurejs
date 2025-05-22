import weaponFactory from './weapon';

test("basic tests", () => {
   const w = weaponFactory("sword");
   expect(w.name()).toBe("sword");
   expect(w.isItem).toBe(true);
   expect(w.isWeapon).toBe(true);
   expect(w.strength()).toBe(1);
});

test("strength", () => {
   const w = weaponFactory("sword", 10);
   expect(w.name()).toBe("sword");
   expect(w.isItem).toBe(true);
   expect(w.isWeapon).toBe(true);
   expect(w.strength()).toBe(10);
});
