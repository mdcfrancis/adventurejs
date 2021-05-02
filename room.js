// room.js
const room = function( attrib ){

    attrib = attrib || {};
    const dv = (value,def ) => (typeof value === "undefined")?def:value;
    const _name = dv( attrib.name, "<lost>");
    const _msg = dv( attrib.msg, "");
    const _doors = dv( attrib.doors, {} );
    let _monster = dv( attrib.monster, null );
    let _item = dv( attrib.item, null );

    function name() {
        return _name;
    }
    function monster() {
        const m = _monster;
        _monster = null;
        return m;
    }
    function doors() {
        return _doors;
    }
    function message() {
        return _msg;
    }
    function item() {
        const i = _item;
        _item = null;
        return i;
    }
    return { name, monster, doors, item, message, isRoom : true };
}

module.exports = room;