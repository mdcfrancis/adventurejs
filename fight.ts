import { ICharacter } from './types';

/**
 * Simulates a die roll (d12 + level modifier)
 * @param level The level modifier to add to the roll
 * @returns The result of the roll
 */
function dieroll(level: number): number {
    const rand = (num: number): number => Math.floor(Math.random() * num);
    return rand(12) + rand(level);
}

/**
 * Simulates a fight between two characters
 * @param char1 The first character
 * @param char2 The second character
 * @returns true if first character dies, false if second character dies
 */
function fight(char1: ICharacter, char2: ICharacter): boolean {
    while (true) {
        const c1roll = dieroll(char1.level()) + char1.getWeapon().strength();
        const c2roll = dieroll(char2.level()) + char2.getWeapon().strength();

        if (c1roll < c2roll) {
            char1.hit();
            console.log(char2.name() + " strikes the " + char1.name());
        } else if (c1roll > c2roll) {
            char2.hit();
            console.log(char1.name() + " strikes the " + char2.name());
        } else {
            console.log("Both missed");
        }

        if (char1.dead()) {
            console.log(char1.name() + " is dead, killed by the " + char2.name());
            return true;
        }
        if (char2.dead()) {
            console.log(char2.name() + " is dead, killed by the " + char1.name());
            return false;
        }
    }
}

export default fight;
