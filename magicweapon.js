// magicweapon.js
const weapon = require( "./weapon");

const rand = ( num ) => Math.floor( Math.random() * num )

const magicweapon = function( n, s ) {
    const _weapon = weapon( n, s );

    function strength() {
        const value = rand( _weapon.strength() );
        console.log("Using a wand of strength " + value );
        return value;
    }
    return { ..._weapon, strength, isMagicWeapon : true }
}
module.exports = magicweapon;