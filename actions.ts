import { IRoom, ICharacter, IDoors, ActionFunction, IActions } from './types';

/**
 * Factory function to create the game actions
 * @param maze The game maze/world object
 * @returns An actions object
 */
const actions = function(maze: Record<string | number, IRoom>): IActions {
    const hits = ["head", "arm", "leg"];
    
    /**
     * Generate a random hit location
     */
    function hit(): string {
        const i = Math.floor(Math.random() * hits.length);
        return hits[i];
    }

    /**
     * Create a movement action for a direction
     * @param direction The direction to move
     */
    function move(direction: string): ActionFunction {
        return function(room: IRoom, player: ICharacter): IRoom {
            return _move(room, direction, player);
        };
    }

    /**
     * Handle movement in a direction
     * @param room The current room
     * @param direction The direction to move
     * @param player The player character
     */
    function _move(room: IRoom, direction: string, player: ICharacter): IRoom {
        const doors = room.doors();
        const door = doors[direction];
        if (!door) {
            console.log("You walk and hit your " + hit() + " ouch!");
        } else if (typeof door == "object") {
            const itm = player.use(door.item);
            if (itm) {
                return maze[door.room];
            } else {
                player.stash(itm!); // This line looks problematic but matches original logic
            }
            console.log("You need the " + door.item + " to go that way");
        } else {
            console.log("you walk towards the " + maze[door].name());
            return maze[door];
        }
        return room;
    }

    /**
     * List player inventory and stats
     */
    function list(room: IRoom, player: ICharacter): IRoom {
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

    /**
     * Show help information
     */
    function help(room: IRoom): IRoom {
        console.log("Type n,s,e,w,u,d,l");
        return room;
    }

    /**
     * Quit the game
     */
    function quit(room: IRoom, player: ICharacter): IRoom {
        console.log("Goodbye...");
        process.exit(0);
        return room; // Never reached but needed for type safety
    }

    /**
     * Available commands
     */
    const command: Record<string, ActionFunction> = {
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
    
    /**
     * Get an action by name
     * @param name The action name
     */
    function action(name: string): ActionFunction | undefined {
        return command[name];
    }
    
    return { action };
};

export default actions;
