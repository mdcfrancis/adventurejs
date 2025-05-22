/**
 * Interface for all game items
 */
export interface IItem {
  /** Returns the name of the item */
  name(): string;
  /** Flag indicating this is an item */
  isItem: boolean;
}

/**
 * Interface for weapons
 */
export interface IWeapon extends IItem {
  /** Returns the strength of the weapon */
  strength(): number;
  /** Flag indicating this is a weapon */
  isWeapon: boolean;
}

/**
 * Interface for magic weapons
 */
export interface IMagicWeapon extends IWeapon {
  /** Flag indicating this is a magic weapon */
  isMagicWeapon: boolean;
}

/**
 * Interface for bags/inventory
 */
export interface IBag extends IItem {
  /** Stash an item in the bag */
  stash(item: IItem): string | null;
  /** Check if the bag includes a specific item */
  includes(itemName: string): boolean;
  /** Fetch and remove an item from the bag */
  fetch(itemName: string): IItem | null;
  /** Get a list of all items in the bag */
  items(): string[];
  /** Get the number of items in the bag */
  size(): number;
  /** Flag indicating this is a bag */
  isBag: boolean;
}

/**
 * Interface for door requirements
 */
export interface IDoorRequirement {
  /** Required item name to pass through the door */
  item: string;
  /** Target room ID */
  room: number | string;
}

/**
 * Type representing different door options
 */
export type Door = number | string | IDoorRequirement;

/**
 * Interface for doors in a room
 */
export interface IDoors {
  [direction: string]: Door;
}

/**
 * Interface for rooms
 */
export interface IRoom {
  /** Returns the name of the room */
  name(): string;
  /** Returns and removes the monster from the room */
  monster(): ICharacter | null;
  /** Returns the available doors */
  doors(): IDoors;
  /** Returns the room message */
  message(): string;
  /** Returns and removes the item from the room */
  item(): IItem | null;
  /** Flag indicating this is a room */
  isRoom: boolean;
}

/**
 * Character attributes interface
 */
export interface ICharacterAttributes {
  /** Hit points */
  hp?: number;
  /** Character level */
  level?: number;
  /** Character weapon */
  weapon?: IWeapon;
}

/**
 * Interface for characters
 */
export interface ICharacter {
  /** Returns the name of the character */
  name(): string;
  /** Stash an item */
  stash(item: IItem): void;
  /** Get the character's bag */
  getBag(): IBag;
  /** Use an item by name */
  use(itemName: string): IItem | null;
  /** Get the character's weapon */
  getWeapon(): IWeapon;
  /** Get the character's hit points */
  getHP(): number;
  /** Reduce hit points by 1 and return new HP */
  hit(): number;
  /** Check if character is dead */
  dead(): boolean;
  /** Get character level */
  level(): number;
  /** Increase level and HP */
  levelUp(): number;
  /** Flag indicating this is a character */
  isCharacter: boolean;
}

/**
 * Action function type
 */
export type ActionFunction = (room: IRoom, player: ICharacter) => IRoom;

/**
 * Actions interface
 */
export interface IActions {
  /** Get an action by name */
  action(name: string): ActionFunction | undefined;
}
