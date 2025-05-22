import { IMagicWeapon } from './types';
import weapon from './weapon';

/**
 * Random number generator helper
 * @param num Maximum value (exclusive)
 * @returns Random integer between 0 and num-1
 */
const rand = (num: number): number => Math.floor(Math.random() * num);

/**
 * Factory function to create a magic weapon with random strength
 * @param n The name of the magic weapon
 * @param s The base strength of the weapon
 * @returns A magic weapon object
 */
const magicweapon = function(n: string, s: number): IMagicWeapon {
    const _weapon = weapon(n, s);
    
    /**
     * Returns a random strength up to the weapon's maximum strength
     */
    function strength(): number {
        const value = rand(_weapon.strength());
        console.log("Using a wand of strength " + value);
        return value;
    }
    
    return { ..._weapon, strength, isMagicWeapon: true };
};

export default magicweapon;
