const character = require( "../character");
const fight = require( "../fight");
const weapons = require( "../weapons");
const magic = require( "../magicweapon");

const wand = magic( "wand", 20 );

function round1() {
    console.log( "Round 1")
    const you = character("Rogue");
    const npc = character("Grump Ork", {hp: 5, weapon: weapons.hammer});

    fight(you, npc);
}

function round2() {
    console.log( "Round 2")
    const you = character("Fighter");
    const npc = character("Grump Ork 2", {hp: 5, weapon: weapons.hammer});
    you.stash( weapons.long_sword );
    you.use( weapons.long_sword.name());
    fight(you, npc);
}

function round3() {
    console.log( "Round 3")
    const you = character("Wizard");
    const npc = character("Grump Ork 3", {hp: 5, weapon: weapons.hammer});
    you.stash( wand );
    you.use( wand.name());
    fight(you, npc);
}

round1();
round2();
round3();
