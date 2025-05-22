import { IDoors, IItem, IRoom, ICharacter } from './types';

/**
 * Room attributes interface
 */
interface IRoomAttributes {
    name?: string;
    msg?: string;
    doors?: IDoors;
    monster?: ICharacter | null;
    item?: IItem | null;
}

/**
 * Factory function to create a room
 * @param attrib Room attributes
 * @returns A room object
 */
const room = function(attrib?: IRoomAttributes): IRoom {
    attrib = attrib || {};
    const dv = <T>(value: T | undefined, def: T): T => (typeof value === "undefined") ? def : value;
    const _name = dv(attrib.name, "<lost>");
    const _msg = dv(attrib.msg, "");
    const _doors = dv(attrib.doors, {});
    let _monster = dv(attrib.monster, null);
    let _item = dv(attrib.item, null);

    /**
     * Returns the name of the room
     */
    function name(): string {
        return _name;
    }
    
    /**
     * Returns and removes the monster from the room
     */
    function monster(): ICharacter | null {
        const m = _monster;
        _monster = null;
        return m;
    }
    
    /**
     * Returns the available doors
     */
    function doors(): IDoors {
        return _doors;
    }
    
    /**
     * Returns the room message
     */
    function message(): string {
        return _msg;
    }
    
    /**
     * Returns and removes the item from the room
     */
    function item(): IItem | null {
        const i = _item;
        _item = null;
        return i;
    }
    
    return { name, monster, doors, item, message, isRoom: true };
};

export default room;
