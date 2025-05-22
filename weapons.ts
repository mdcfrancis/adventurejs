import weapon from './weapon';
import { IWeapon } from './types';

/**
 * Predefined weapons available in the game
 */

/** Basic hand attack */
const hand: IWeapon = weapon("Hand", 1);

/** Short sword weapon */
const short_sword: IWeapon = weapon("Short Sword", 5);

/** Long sword weapon */
const long_sword: IWeapon = weapon("Long Sword", 10);

/** Hammer weapon */
const hammer: IWeapon = weapon("Hammer", 2);

export default { hand, short_sword, long_sword, hammer };
