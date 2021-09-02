const person = require('./person');

class boat {
    constructor () {
        // Makes the basic boat object
        this.maxPaddlers = 20; //Must Be even
        
        this.left = []
        for (var x = 0; x < this.maxPaddlers / 2; x++) {
            this.left[x] = null;
        }
        this.right = []
        for (var x = 0; x < this.maxPaddlers / 2; x++) {
            this.right[x] = null;
        }
    }

    addListOfPaddlers(paddlerList) {
        //Sort List by weight
        paddlerList.sort((a, b) => {
            return a.weight - b.weight;
        });

        paddlerList.forEach(paddler => {
            let notFound = true;
            for (var sideIndex = 0; sideIndex <= this.left.length / 2 && notFound; sideIndex ++) {
                if (this.left[sideIndex] === null) {
                    this.left[sideIndex] = paddler;
                    notFound = false;
                } else if (this.right[sideIndex] === null) {
                    this.right[sideIndex] = paddler;
                    notFound = false;
                } else if (this.left[this.left.length - sideIndex] === null) {
                    this.left[this.left.length - sideIndex] = paddler;
                    notFound = false;
                } else if (this.right[this.right.length - sideIndex] === null) {
                    this.right[this.right.length - sideIndex] = paddler;
                    notFound = false;
                } 
            }
        });
    }

}

module.exports = boat;