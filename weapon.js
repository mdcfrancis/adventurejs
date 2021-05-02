// weapon.js
const item = require( "./item");
const weapon = function( n, s ) {
    const _item = item( n );
    const _strength = s || 1;

    function strength() {
        return _strength;
    }
    return { ..._item, strength, isWeapon : true }
}
module.exports = weapon;