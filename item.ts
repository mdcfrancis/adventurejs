import { IItem } from './types';

/**
 * Factory function to create a basic item
 * @param n The name of the item
 * @returns An item object
 */
const item = function(n: string): IItem {
    const _name = n;
    
    /**
     * Returns the name of the item
     */
    function name(): string {
        return _name;
    }
    
    return { name, isItem: true };
};

export default item;
