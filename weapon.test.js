// weapon.test.js
const weapon = require("./weapon");

test( "Create a weapon and assert behavior", ()=>{
    const obj = weapon( "MyWeapon");
    expect( obj.name()).toBe("MyWeapon");
    expect( obj.isWeapon).toBe( true );
    expect( obj.isItem).toBe( true );
    expect( obj.strength()).toBe( 1 );
});

test( "Create a powerful weapon", ()=>{
    const obj = weapon( "LongSword", 5);
    expect( obj.name()).toBe("LongSword");
    expect( obj.isWeapon).toBe( true );
    expect( obj.isItem).toBe( true );
    expect( obj.strength()).toBe( 5 );
});