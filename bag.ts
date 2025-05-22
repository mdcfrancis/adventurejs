import { IBag, IItem } from './types';
import item from './item';

/**
 * Factory function to create a bag/inventory
 * @param n The name of the bag
 * @param capacity The maximum capacity of the bag (default: 5)
 * @returns A bag object
 */
const bag = function(n: string, capacity?: number): IBag {
    const _item = item(n);
    const _size: number = capacity || 5; // 1 is the minimum size
    const _items: Record<string, IItem> = {};
    
    /**
     * Add an item to the bag
     * @param item The item to stash
     * @returns null on success, error message on failure
     */
    function stash(item: any): string | null {
        if (size() >= _size) {
            return "Your bag is full, you have to drop an item first";
        }
        if (!item.isItem) {
            return "A bag can only be filled with items not " + typeof item + "'s";
        }
        _items[item.name()] = item;
        return null;
    }
    
    /**
     * Check if the bag contains an item by name
     * @param itemName The name of the item to check
     * @returns true if the item is in the bag
     */
    function includes(itemName: string): boolean {
        return _items[itemName] != null;
    }
    
    /**
     * Retrieve and remove an item from the bag
     * @param itemName The name of the item to fetch
     * @returns The item or null if not found
     */
    function fetch(itemName: string): IItem | null {
        let item = _items[itemName];
        if (item == null) {
            return null;
        }
        delete _items[itemName];
        return item;
    }
    
    /**
     * Get a list of all item names in the bag
     * @returns Array of item names
     */
    function items(): string[] {
        return Object.keys(_items);
    }
    
    /**
     * Get the current number of items in the bag
     * @returns Number of items
     */
    function size(): number {
        return Object.keys(_items).length;
    }
   
    return { ..._item, stash, includes, fetch, items, size, isBag: true };
};

export default bag;
