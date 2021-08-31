const person = require('./person');
const boat = require('./boat.js');


let fs = require("fs");
let filename = "test" + ".csv";
let tempPaddlers = fs.readFileSync(filename, "utf8");
tempPaddlers = tempPaddlers.split("\r\n")
for (var i = 0; i < tempPaddlers.length; i++) { 
    tempPaddlers[i] = tempPaddlers[i].split(",") ;
}
tempPaddlers = tempPaddlers.slice(1,-1);
paddlers = []
tempPaddlers.forEach(paddler => {
    paddlers[paddlers.length] = new person(paddler[3],paddler[0],paddler[2]);
});
//Paddlers in form: Weight, Gender, Preference, Weight


//Start off on by splitting the paddlers to be half on left half on right.
//Move the lightest paddler on the lighter side to the other side swapping with a person heaver than them, if there is no person heavier than them move up to the next lightest person on the lighter side, when found swap.

//Generate initial boat with random placement (Based off CSV Order)
var myBoat = new boat();

paddlers.forEach(paddler => {
    myBoat.addUnorderedPerson(paddler);
});
console.log(myBoat);
console.log(Math.abs(myBoat.calculateMomentDiff()));

myBoat.balanceBoat();

console.log(myBoat);
console.log(Math.abs(myBoat.calculateMomentDiff()));