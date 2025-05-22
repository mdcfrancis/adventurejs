import { IWeapon } from './types';
import item from './item';

/**
 * Factory function to create a weapon
 * @param n The name of the weapon
 * @param s The strength of the weapon (default: 1)
 * @returns A weapon object
 */
const weapon = function(n: string, s?: number): IWeapon {
    const _item = item(n);
    const _strength = s || 1;
    
    /**
     * Returns the strength of the weapon
     */
    function strength(): number {
        return _strength;
    }
    
    return { ..._item, strength, isWeapon: true };
};

export default weapon;
