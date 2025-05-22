import { ICharacter, ICharacterAttributes, IItem, IWeapon, IBag } from './types';
import weapons from './weapons';
import bagFactory from './bag';

/**
 * Factory function to create a character
 * @param who The character's name
 * @param attrib Character attributes
 * @returns A character object
 */
const character = function(who: string, attrib?: ICharacterAttributes): ICharacter {
    attrib = attrib || {};
    const _name = who;
    const dv = <T>(value: T | undefined, def: T): T => (typeof value === "undefined") ? def : value;
    let _hp = dv(attrib.hp, 10);
    let _level = dv(attrib.level, 1);
    const _bag: IBag = bagFactory("Bag of Holding", 5);
    let _weapon: IWeapon = dv(attrib.weapon, weapons.hand);

    /**
     * Returns the character's name
     */
    function name(): string {
        return _name;
    }
    
    /**
     * Character takes damage, returns new HP
     */
    function hit(): number {
        return _hp -= 1;
    }
    
    /**
     * Check if character is dead
     */
    function dead(): boolean {
        return _hp === 0;
    }
    
    /**
     * Add an item to the character's bag
     * @param item The item to stash
     */
    function stash(item: IItem): void {
        let err = _bag.stash(item);
        if (err == null) {
            console.log("You found the " + item.name() + " and stashed it away");
        } else {
            console.log("You can only stash items and not " + typeof item);
        }
    }
    
    /**
     * Use an item from the character's bag
     * @param itemName The name of the item to use
     * @returns The used item or null
     */
    function use(itemName: string): IItem | null {
        const thing = _bag.fetch(itemName);
        if (!thing) {
            return null;
        }
        if ((thing as IWeapon).isWeapon) {
            console.log("You grab the " + thing.name() + " and get ready to fight");
            _weapon = thing as IWeapon;
        } else {
            console.log("You use the " + thing.name());
        }
        return thing;
    }
    
    /**
     * Get the character's bag
     */
    function getBag(): IBag {
        return _bag;
    }
    
    /**
     * Get the character's weapon
     */
    function getWeapon(): IWeapon {
        return _weapon;
    }
    
    /**
     * Get the character's hit points
     */
    function getHP(): number {
        return _hp;
    }
    
    /**
     * Get the character's level
     */
    function level(): number {
        return _level;
    }
    
    /**
     * Increase character level and HP
     */
    function levelUp(): number {
        _hp += 1;
        return _level += 1;
    }
    
    return { name, stash, getBag, use, getWeapon, getHP, hit, dead, level, levelUp, isCharacter: true };
};

export default character;
