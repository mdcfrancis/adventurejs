// maze.js
const readline = require( "readline");
const room = require( "./room");
const fight = require( "./fight");
const act = require( "./actions");
const character = require( "./character");
const weapons = require( "./weapons");
const item = require( "./item");



const mobs = function() {
    // List of mobs, frequency in list determines how often they appear
    const mobs = [
        { name: "ogre", level: 7, hp: 20 },
        { name: "golem", level: 6, hp: 15 },
        { name: "ork", level: 5, hp: 15 },
        { name: "skeleton", level: 4, hp: 10 },
        { name: "skeleton", level: 4, hp: 9 },
        { name: "skeleton", level: 4, hp: 5 },
        { name: "skeleton", level: 4, hp: 5 },
        { name: "zombie", level: 1, hp: 1 },
        { name: "zombie", level: 1, hp: 1  },
        { name: "zombie", level: 1, hp: 1 },
        { name: "zombie", level: 1, hp: 1 },
        { name: "zombie", level: 2, hp: 3 },
        { name: "zombie", level: 3, hp: 4 },
        { name: "zombie", level: 3, hp: 4 },
        { name: "zombie", level: 3, hp: 4 }
    ];
    const mob_obj = mobs.map( (m)=> character( m.name, m ));
    function get()
    {
        const i = Math.floor( Math.random() * mobs.length);
        return mob_obj[i];
    }
    return { get }
}()


const maze = {
    1: room({ name: "The Entrance Room",
        msg: "There is an old rusty chest in the corner",
        doors: {
            n: 2,
            e: 3,
            w: 4,
            u: { item: "ladder", room: 6 },
            o: "chest1"
        }
    }),
    "chest1": room( {
        name: "Rusty chest",
        msg:"",
        item: weapons.short_sword,
        doors: {
            c: 1
        }
    }),
    2: room({
        name: "The dark room",
        msg: "The room is very dark",
        doors: {
            s: 1,
            e: 5
        },
        monster: mobs.get()
    }),
    3: room( {
        name: "The great room",
        msg: "You are in a very big room",
        doors: {
            w: 1,
            n: { item:"blue key", room: 5 },
            e: 6
        }
    }),
    4: room( {
        name: "The cloakroom",
        msg: "There is not much room in here",
        doors: {
            e:1
        },
        item: item( "blue key" )

    }),
    5: room( {
        name: "The corridor",
        msg: "a long curving corridor",
        doors: {
            w: 2,
            e: { item : "blue key", room: 3 }
        },
        monster: mobs.get()
    }),
    6: room( {
        name: "The ante room",
        msg: "A strange cross shaped room",
        doors:{
            w: 8,
            e: 9,
            n: 7,
            s: 3
        },
        monster: mobs.get()
    }),
    7: room( {
        name: "Corridor",
        msg: "A curving corridor",
        doors: {
            s: 6,
            n: 10
        },
        monster: mobs.get()
    }),
    8: room( {
        name: "Side room",
        msg:"A small side room",
        doors: {
            e: 6
        }
    }),
    9: room( {
        name: "Side room",
        msg:"A small side room",
        doors: {
            w: 6
        },
        item: item( "ladder" ),
        monstor:mobs.get()
    }),
    10: room( {
        name: "Roostery",
        msg: "A long abandoned room, there is a bird cage in the corner",
        doors: {
            e: 7,
            w: 11,
            o: "bird cage"
        }
    }),
    "bird cage" : room({
        name: "The bird cage",
        msg: "A strange place for a weapon",
        item: weapons.long_sword,
        doors: {
            c: 10
        }
    }),
    11: room({
        name: "Mine shaft",
        msg: "An old mine",
        doors: {
            e: 10,
            d: 12
        },
        monster: mobs.get()

    }),
    12: room({
        name: "Dragons Layer",
        msg: "This is a scary place, good luck",
        doors: {
            u: { item: "ladder", room: 11},
            n: 13
        },
        monster: character("Ancient Dragon", {level: 50, hp: 50 })
    }),
    13: room( {
        name: "daylight",
        msg: "You have escaped"
    })
};

const actions = require( "./actions")( maze );

function _run( room, player, command ) {
    const action = actions.action(command);
    if (!action) {
        console.log("I do not know how to '" + command + "' type ? or help for help");
        return room;
    }
    room = action(room, player);
    console.log("You are in " + room.name());
    console.log(room.message());
    // Empty doors mark the end
    const doors = Object.keys(room.doors());
    if (doors.length === 0) {
        // FIXME clean exit
        process.exit(0);
    }
    console.log("You see doors to the " + doors );
    let mob = room.monster();
    if (mob) {
        console.log("There is a " + mob.name() + " in here!!!");
        console.log("it starts to attack you");
        console.log("you use your " + player.getWeapon().name() + " to attack it");
        // fight returns true if the first listed dies
        if (fight(player, mob)) {
            console.log("you lost, goodbye!");
            process.exit(0);
        }
    }
    const i = room.item()
    if (i != null) {
        player.stash(i);
        // Fixme, the player should be able to choose a weapon. For now we always use the stronger.
        if (i.isWeapon && i.strength() > player.getWeapon().strength()) {
            player.use(i.name());
        }
    }
    player.levelUp();
    return room;
}


function run( )
{
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "command> "
    });

    const player = character( "Brave Adventurer");
    console.log( "Hello Player");

    let where = maze[1];
    let session = ( command ) => where = _run( where, player, command );
    session( "l");
    rl.prompt();
    rl.on("line", (line) => {
        session( line.trim() )
        rl.prompt();
    }).on("close", ()=>{
        console.log( "Fare thee well brave adventurer");
    });
}
run();