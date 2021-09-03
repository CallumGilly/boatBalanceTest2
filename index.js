const person = require('./person');
const boat = require('./boat.js');


const fs = require("fs");
const filename = "test" + ".csv";
let tempPaddlers = fs.readFileSync(filename, "utf8");
tempPaddlers = tempPaddlers.split("\r\n")
for (var i = 0; i < tempPaddlers.length; i++) { 
    tempPaddlers[i] = tempPaddlers[i].split(",") ;
}
tempPaddlers = tempPaddlers.slice(1,-1);
paddlers = []
tempPaddlers.forEach(paddler => {
    paddlers[paddlers.length] = new person(paddler[0],paddler[1],paddler[2],paddler[3]);
});
//Paddlers in form: Weight, Gender, Preference, Weight
var myBoat = new boat();
myBoat.addListOfPaddlers(paddlers);
console.log(myBoat.calculateMoment());
console.log(myBoat);
myBoat.optimiseBoat();
console.log(myBoat);
console.log(myBoat.calculateMoment());