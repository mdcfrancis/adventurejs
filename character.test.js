// character.test.js
const character = require( "./character");
const weapons = require( "./weapons");

test( "basic tests", () => {
   const char = character( "person");
   expect( char.name()).toBe( "person");
   expect( char.dead()).toBe( false );
   expect( char.level()).toBe( 1 );
   expect( char.isCharacter).toBe( true );
   expect( char.getWeapon()).toStrictEqual( weapons.hand);
});

test( "monster tests", () => {
   const char = character( "ogre", {
       hp: 20,
       level : 5,
       weapon : weapons.hammer
   });
   expect( char.name()).toBe( "ogre");
   expect( char.dead()).toBe( false );
   expect( char.level()).toBe( 5 );
   expect( char.isCharacter).toBe( true );
   expect( char.getWeapon()).toStrictEqual( weapons.hammer);
});

test( "hits", () => {
   const char = character( "red shirt");
   for( let i = 0 ; i < 10; i ++ ) {
       expect( char.dead()).toBe( false );
       char.hit()
   }
   expect( char.dead()).toBe( true );
});

test( "hits", () => {
    const char = character( "red shirt");
    for( let i = 0 ; i < 10; i ++ ) {
        expect( char.dead()).toBe( false );
        expect( char.hit() ).toBe( 9 - i );
    }
    expect( char.dead()).toBe( true );
});

test( "levels", () => {
    const char = character( "yellow shirt");
    for( let i = 0 ; i < 10; i ++ ) {
        expect( char.dead()).toBe( false );
        expect( char.hit() ).toBe( 9 - i );
    }
    expect( char.dead()).toBe( true );
    // adding a level increases hp and brings back from dead.
    expect( char.levelUp()).toBe( 2 );
    expect( char.dead()).toBe( false );

});
