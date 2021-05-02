// item.js
const item = function( n ) {
    const _name = n;
    function name() {
        return _name;
    }
    return { name, isItem : true };
}

module.exports = item;


