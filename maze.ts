import readline from 'readline';
import roomFactory from './room';
import fight from './fight';
import actionsFactory from './actions';
import characterFactory from './character';
import weapons from './weapons';
import itemFactory from './item';
import { ICharacter, IRoom } from './types';

/**
 * Factory for generating random monsters
 */
const mobs = (function() {
    const mobs = [
        { name: "ogre", level: 7, hp: 20 },
        { name: "golem", level: 6, hp: 15 },
        { name: "ork", level: 5, hp: 15 },
        { name: "skeleton", level: 4, hp: 10 },
        { name: "skeleton", level: 4, hp: 9 },
        { name: "skeleton", level: 4, hp: 5 },
        { name: "skeleton", level: 4, hp: 5 },
        { name: "zombie", level: 1, hp: 1 },
        { name: "zombie", level: 1, hp: 1 },
        { name: "zombie", level: 1, hp: 1 },
        { name: "zombie", level: 1, hp: 1 },
        { name: "zombie", level: 2, hp: 3 },
        { name: "zombie", level: 3, hp: 4 },
        { name: "zombie", level: 3, hp: 4 },
        { name: "zombie", level: 3, hp: 4 }
    ];
    const mob_obj = mobs.map((m) => characterFactory(m.name, m));
    
    /**
     * Get a random monster
     */
    function get(): ICharacter {
        const i = Math.floor(Math.random() * mobs.length);
        return mob_obj[i];
    }
    
    return { get };
})();

/**
 * The game maze/world definition
 */
const maze: Record<string | number, IRoom> = {
    1: roomFactory({
        name: "The Entrance Room",
        msg: "There is an old rusty chest in the corner",
        doors: {
            n: 2,
            e: 3,
            w: 4,
            u: { item: "ladder", room: 6 },
            o: "chest1"
        }
    }),
    "chest1": roomFactory({
        name: "Rusty chest",
        msg: "",
        item: weapons.short_sword,
        doors: {
            c: 1
        }
    }),
    2: roomFactory({
        name: "The dark room",
        msg: "The room is very dark",
        doors: {
            s: 1,
            e: 5
        },
        monster: mobs.get()
    }),
    3: roomFactory({
        name: "The great room",
        msg: "You are in a very big room",
        doors: {
            w: 1,
            n: { item: "blue key", room: 5 },
            e: 6
        }
    }),
    4: roomFactory({
        name: "The cloakroom",
        msg: "There is not much room in here",
        doors: {
            e: 1
        },
        item: itemFactory("blue key")
    }),
    5: roomFactory({
        name: "The corridor",
        msg: "a long curving corridor",
        doors: {
            w: 2,
            e: { item: "blue key", room: 3 }
        },
        monster: mobs.get()
    }),
    6: roomFactory({
        name: "The ante room",
        msg: "A strange cross shaped room",
        doors: {
            w: 8,
            e: 9,
            n: 7,
            s: 3
        },
        monster: mobs.get()
    }),
    7: roomFactory({
        name: "Corridor",
        msg: "A curving corridor",
        doors: {
            s: 6,
            n: 10
        },
        monster: mobs.get()
    }),
    8: roomFactory({
        name: "Side room",
        msg: "A small side room",
        doors: {
            e: 6
        }
    }),
    9: roomFactory({
        name: "Side room",
        msg: "A small side room",
        doors: {
            w: 6
        },
        item: itemFactory("ladder"),
        monster: mobs.get()
    }),
    10: roomFactory({
        name: "Roostery",
        msg: "A long abandoned room, there is a bird cage in the corner",
        doors: {
            e: 7,
            w: 11,
            o: "bird cage"
        }
    }),
    "bird cage": roomFactory({
        name: "The bird cage",
        msg: "A strange place for a weapon",
        item: weapons.long_sword,
        doors: {
            c: 10
        }
    }),
    11: roomFactory({
        name: "Mine shaft",
        msg: "An old mine",
        doors: {
            e: 10,
            d: 12
        },
        monster: mobs.get()
    }),
    12: roomFactory({
        name: "Dragons Layer",
        msg: "This is a scary place, good luck",
        doors: {
            u: { item: "ladder", room: 11 },
            n: 13
        },
        monster: characterFactory("Ancient Dragon", { level: 50, hp: 50 })
    }),
    13: roomFactory({
        name: "daylight",
        msg: "You have escaped"
    })
};

/**
 * Game actions factory
 */
const actions = actionsFactory(maze);

/**
 * Process a command
 * @param room The current room
 * @param player The player character
 * @param command The command to execute
 * @returns The new room after command execution
 */
function _run(room: IRoom, player: ICharacter, command: string): IRoom {
    const action = actions.action(command);
    if (!action) {
        console.log("I do not know how to '" + command + "' type ? or help for help");
        return room;
    }
    room = action(room, player);
    console.log("You are in " + room.name());
    console.log(room.message());
    const doors = Object.keys(room.doors());
    if (doors.length === 0) {
        process.exit(0);
    }
    console.log("You see doors to the " + doors);
    let mob = room.monster();
    if (mob) {
        console.log("There is a " + mob.name() + " in here!!!");
        console.log("it starts to attack you");
        console.log("you use your " + player.getWeapon().name() + " to attack it");
        if (fight(player, mob)) {
            console.log("you lost, goodbye!");
            process.exit(0);
        }
    }
    const i = room.item();
    if (i != null) {
        player.stash(i);
        if ((i as any).isWeapon && (i as any).strength() > player.getWeapon().strength()) {
            player.use(i.name());
        }
    }
    player.levelUp();
    return room;
}

/**
 * Main game function
 */
function run(): void {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "command> "
    });

    const player = characterFactory("Brave Adventurer");
    console.log("Hello Player");

    let where = maze[1];
    let session = (command: string) => where = _run(where, player, command);
    session("l");
    rl.prompt();
    rl.on("line", (line) => {
        session(line.trim());
        rl.prompt();
    }).on("close", () => {
        console.log("Fare thee well brave adventurer");
    });
}

run();
