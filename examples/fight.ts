import characterFactory from '../character';
import fight from '../fight';
import weapons from '../weapons';
import magic from '../magicweapon';
import { IMagicWeapon } from '../types';

const wand: IMagicWeapon = magic("wand", 20);

/**
 * First round of combat example
 */
function round1(): void {
    console.log("Round 1");
    const you = characterFactory("Rogue");
    const npc = characterFactory("Grump Ork", {hp: 5, weapon: weapons.hammer});

    fight(you, npc);
}

/**
 * Second round of combat with a long sword
 */
function round2(): void {
    console.log("Round 2");
    const you = characterFactory("Fighter");
    const npc = characterFactory("Grump Ork 2", {hp: 5, weapon: weapons.hammer});
    you.stash(weapons.long_sword);
    you.use(weapons.long_sword.name());
    fight(you, npc);
}

/**
 * Third round of combat with a magic weapon
 */
function round3(): void {
    console.log("Round 3");
    const you = characterFactory("Wizard");
    const npc = characterFactory("Grump Ork 3", {hp: 5, weapon: weapons.hammer});
    you.stash(wand);
    you.use(wand.name());
    fight(you, npc);
}

round1();
round2();
round3();
