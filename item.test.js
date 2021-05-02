// item.test.js
const item = require( "./item");

test( "Create a weapon and assert behavior", ()=>{
    const myItem = item( "MyItem");
    expect( myItem.name()).toBe("MyItem");
    expect( myItem.isItem).toBe( true );
    expect( myItem.isWeapon).toBeUndefined();
});
