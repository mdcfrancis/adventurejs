// bag.js
const item = require( "./item");

const bag = function( n, capacity ) {
    const _item = item( n );
    const _size = capacity || 5; // 1 is the minimum size
    const _items = {};
    function stash( item ) {
        if ( size() >=  _size ) {
            return "Your bag is full, you have to drop an item first";
        }
        if ( !item.isItem ) {
            return "A bag can only be filled with items not " + typeof item + "'s";
        }
        _items[item.name()] = item;
        return null;
    }
    function includes( itemName ) {
        return _items[itemName] != null
    }
    function fetch( itemName ) {
        let item = _items[itemName]
        if (item == null ) {
            return null;         }
        delete _items[itemName];
        return item;
    }
    function items( ) {
        return Object.keys( _items );
    }
    function size() {
        return Object.keys( _items ).length
    }
   
    return { ..._item, stash, includes, fetch, items, size, isBag : true }
}

module.exports = bag;