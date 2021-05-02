// character.js
const weapons = require("./weapons");
const bag = require("./bag");

const character = function(who, attrib) {
    attrib = attrib || {};
    const _name = who;
    const dv = (value,def ) => (typeof value === "undefined")?def:value;
    let _hp = dv( attrib.hp, 10 );
    let _level = dv( attrib.level, 1 );
    const _bag = bag("Bag of Holding",5);
    let _weapon =  dv( attrib.weapon, weapons.hand);

    function name() {
        return _name;
    }
    function hit() {
        return _hp -= 1;
    }
    function dead() {
        return _hp === 0
    }
    function stash( item ) {
        let err = _bag.stash(item)
        if ( err == null) {
            console.log("You found the " + item.name() + " and stashed it away");
        } else {
            console.log("You can only stash items and not " + typeof item );
        }
    }
    function use( itemName ) {
        const thing = _bag.fetch( itemName );
        if (!thing ){
            return null;
        }
        if (thing.isWeapon) {
            console.log( "You grab the " + thing.name() + " and get ready to fight");
            _weapon = thing;
        } else {
            console.log( "You use the " + thing.name() )
        }
        return thing;
    }
    function getBag() {
        return _bag;
    }
    function getWeapon() {
        return _weapon;
    }
    function getHP() {
        return _hp;
    }
    function level() {
        return _level;
    }
    function levelUp() {
        _hp += 1;
        return _level += 1;
    }
    return { name, stash, getBag, use, getWeapon, getHP, hit, dead, level, levelUp, isCharacter : true }
}

module.exports = character;
