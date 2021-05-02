
const actions = function( maze ) {
    const hits = [ "head", "arm", "leg" ]
    function hit() {
        const i = Math.floor(Math.random() * hits.length);
        return hits[i];
    }

    function move(direction) {
        return function (room, player) {
            return _move(room, direction, player)
        }
    }

    function _move(room, direction, player) {
        const door = room.doors()[direction];
        if (!door) {
            console.log("You walk and hit your " + hit() + " ouch!");
        } else if (typeof door == "object") {
            const itm = player.use( door.item);
            if ( itm ) {
                return maze[door.room];
            } else
            {
                player.stash( itm );
            }
            console.log("You need the " + door.item + " to go that way");
        } else {
            console.log( "you walk towards the " + maze[door].name())
            return maze[door];
        }
        return room;
    }

    function list(room, player) {
        const bag = player.getBag();
        if (bag.items().length) {
            console.log("Your bag contains " + bag.items());
        } else {
            console.log("You have nothing in your bag");
        }
        console.log("You have a " + player.getWeapon().name() + " to defend with");
        console.log("You have " + player.getHP() + " health left");
        return room;
    }

    function help(room) {
        console.log("Type n,s,e,w,u,d,l");
        return room;
    }

    function quit(room, player) {
        console.log("Goodbye...");
        process.exit(0);
    }

    const command = {
        list: list,
        l: list,
        east: move("e"),
        e: move("e"),
        west: move("w"),
        w: move("w"),
        north: move("n"),
        n: move("n"),
        south: move("s"),
        s: move("s"),
        up: move("u"),
        u: move("u"),
        down: move("d"),
        d: move("d"),
        o: move("o"),
        open: move("open"),
        c: move("c"),
        close: move("close"),
        q: quit,
        quit: quit,
        "?": help,
        "help": help
    };
    function action( name ) {
        return command[name]
    }
    return { action };
}
module.exports = actions;
