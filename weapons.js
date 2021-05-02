// Weapons.js
const weapon = require( "./weapon");
// Create a few weapons so that we can reference them from other modules
const hand = weapon("Hand", 1);
const short_sword = weapon("Short Sword", 5);
const long_sword =  weapon("Long Sword", 10);
const hammer = weapon("Hammer", 2);

module.exports = { hand, short_sword, long_sword, hammer }