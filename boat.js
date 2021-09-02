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

    calculateSideMoment(sideArray) {
        //Input: array of one side
        //Output: moment of side
        //Boat size: Index is row, value is width

        let boatSize = [0.89,0.97,1.06,1.11,1.15,1.15,1.11,1.06,0.97,0.89];
        let totalMoment = 0;

        if(sideArray.length > boatSize.length) {return -1}

        for (var x = 1; x < sideArray.length; x++) {
            totalMoment += boatSize[x] * sideArray[x].weight;
        }
        return totalMoment;
    }

    calculateMoment() {
        //Input: N/A
        //Output: {Number, Number} = {leftMoment - RightMoment, FrontMoment - BackMoment}
        //Thus if negative than right heavy or back heavy

        let leftMoment = this.calculateSideMoment(this.left);
        let rightMoment = this.calculateSideMoment(this.right);

        let leftRightMoment = leftMoment - rightMoment;

        //Take center of boat to be between seat 4 and 5
        //Take seat widths to be 0.8m between each seat

        let frontBackMoment = 0;

        //moment of seat = seat dist from 4/5 * 0.8 * weight
        for (var seatNum = 0; seatNum < this.left.length; seatNum ++) {
            if (seatNum <= 4) {
                let multiplier = ((4 - seatNum) * 0.8) + 0.4;
                frontBackMoment += multiplier * this.left[seatNum].weight;
                frontBackMoment += multiplier * this.right[seatNum].weight;
            } else { // (seatNum > 4)
                let multiplier = ((seatNum - 5) * 0.8) + 0.4;
                frontBackMoment -= multiplier * this.left[seatNum].weight;
                frontBackMoment -= multiplier * this.right[seatNum].weight
            };
        }

        return {leftRightMoment, frontBackMoment}
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