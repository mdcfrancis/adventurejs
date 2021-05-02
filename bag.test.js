// bag.test.js
const bag = require("./bag");
const weapon = require("./weapon");
const item = require("./item");

test( "Create a bag and assert behavior", ()=>{
    const obj = bag( "MyBag");
    expect( obj.name()).toBe("MyBag");
    expect( obj.isBag).toBe( true );
    expect( obj.isItem).toBe( true );
    expect( obj.isWeapon).toBeUndefined();
    expect( obj.items()).toStrictEqual( [] );
    expect( obj.size()).toBe( 0 );
});

test( "test stash", ()=>{
    const obj = bag( "Bag of Holding", 2);
    expect( obj.name()).toBe("Bag of Holding");
    const paper = item( "paper");
    expect( obj.size()).toBe( 0 );
    expect( obj.stash( paper )).toBeNull(); // Returns null on success, error message on fail
    expect( obj.size()).toBe( 1 );
    expect( obj.items()).toStrictEqual( ["paper"]);
    expect( typeof obj.stash( "unknown")).toBe( "string" );
    expect( obj.size()).toBe( 1 );
    // Same item just succeeds
    expect( obj.stash( paper )).toBeNull();
    expect( obj.size()).toBe( 1 );
    const rock = item( "rock");
    expect( obj.stash( rock )).toBeNull();
    expect( obj.size()).toBe( 2 );
    expect( obj.items()).toStrictEqual( ["paper", "rock"]);
});

test( "test fetch", ()=>{
    const obj = bag( "Bag of Holding", 2);
    expect( obj.name()).toBe("Bag of Holding");
    const paper = item( "paper");
    expect( obj.size()).toBe( 0 );
    expect( obj.stash( paper )).toBeNull(); // Returns null on success, error message on fail
    expect( obj.size()).toBe( 1 );
    expect( obj.items()).toStrictEqual( ["paper"]);
    expect( obj.fetch( "paper")).toBe( paper );
    expect( obj.size()).toBe( 0 );
    expect( obj.items()).toStrictEqual( []);
    expect( obj.fetch( "item")).toBeNull();
});

test( "capacity", ()=>{
    const obj = bag( "Bag of little Holding", 1 );
    const paper = item( "paper");
    expect( obj.size()).toBe( 0 );
    expect( obj.stash( paper )).toBeNull();
    expect( obj.size()).toBe( 1 );
    const rock = item( "rock");
    expect( typeof obj.stash( paper )).toBe( "string");
    expect( obj.size()).toBe( 1 );
});