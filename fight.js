// fight.js
// dieroll simulates a die roll, d12 + a modifier
function dieroll( level )
{
    const rand = ( num ) => Math.floor( Math.random() * num )
    return rand( 12 ) + rand( level );
}

function fight( char1, char2 ) {
    while (true) {
        const c1roll = dieroll(char1.level()) + char1.getWeapon().strength();
        const c2roll = dieroll(char2.level()) + char2.getWeapon().strength();

        if (c1roll < c2roll) {
            char1.hit();
            console.log( char2.name() + " strikes the " + char1.name());
        } else if ( c1roll > c2roll ) {
            char2.hit()
            console.log( char1.name() + " strikes the " + char2.name());
        } else {
            console.log( "Both missed" );
        }

        if (char1.dead()) {
            console.log( char1.name() + " is dead, killed by the " + char2.name());
            return true;
        }
        if (char2.dead()) {
            console.log( char2.name() + " is dead, killed by the " + char1.name());
            return false;
        }
    }
}

module.exports = fight;
