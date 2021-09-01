const person = require('./person');

class boat {
    constructor () {
        // Makes the basic boat object
        this.totalPaddlers = 0;
        this.left = [null];
        this.right = [null];
    }

    addUnorderedPerson (person) {
        //Add the new person to the side with the least people or the left and increase the total by 1
        if (this.left.length > this.right.length) {
            this.right[this.right.length] = person;
            this.totalPaddlers ++;
        } else {
            this.left[this.left.length] = person;
            this.totalPaddlers ++;
        }
    }

    calcSideMoment(arr) {
        //Boat size: Index is row, value is width - 0 is 0 as it is the drummer position
        let boatSize = [0,0.89,0.97,1.06,1.11,1.15,1.15,1.11,1.06,0.97,0.89];
        let totalMoment = 0;
        if(arr.length > boatSize.length) {return -1}
        for (var x = 1; x < arr.length; x++) {
            totalMoment += boatSize[x] * arr[x].weight;
        }
        return totalMoment;
    }

    calcLongMoment() {
        let seatDist = 0.80;
    }

    calculateMomentDiff() { // Negative means left heavy
        let leftMoment = this.calcSideMoment(this.left);
        let rightMoment = this.calcSideMoment(this.right);
        return rightMoment - leftMoment;
    }
    
    swap(theBoat, leftIndex, rightIndex) {
        let temp = theBoat.left[leftIndex];
        theBoat.left[leftIndex] = theBoat.right[rightIndex];
        theBoat.right[rightIndex] = temp;
        return theBoat;
    }
    balanceBoat() {
        while (Math.abs(this.calculateMomentDiff()) > 0) {
            this.changeOneSideBalance();
        }
        
    }

    changeOneSideBalance() {
        let original = this.calculateMomentDiff();
        if (original === 0) {return -1}
        //Pick a random person on the heaviest side.
        //Work out the moment for swapping them with every other person in the boat
        //Make the swap that brings the moment closest to being equal
        let randoIndex;
        if (original < 0) {
            //When Left Heavy
            let totalPaddlersOnSide = this.left.length - 2;
            randoIndex = Math.floor(Math.random() * totalPaddlersOnSide) + 1;
            let bestAbsMoment = original;
            let personIndex = null;
            for (var index = 1; index < this.right.length; index ++) {
                let tempBoat = this;
                tempBoat = this.swap(tempBoat,randoIndex,index);
                if (Math.abs(tempBoat.calculateMomentDiff()) < bestAbsMoment) {
                    bestAbsMoment = Math.abs(tempBoat.calculateMomentDiff());
                    personIndex = index;
                }
            }
            if (personIndex != null) {
                let tempBoat = this.swap(this, randoIndex, personIndex);
                if (Math.abs(tempBoat.calculateMomentDiff()) < Math.abs(original)) {
                    this.left = tempBoat.left;
                    this.right = tempBoat.right;
                }
            }
        } else {
            //When Right Heavy
            let totalPaddlersOnSide = this.right.length - 2;
            randoIndex = Math.floor(Math.random() * totalPaddlersOnSide) + 1;
            let bestAbsMoment = original;
            let personIndex = null;
            for (var index = 1; index < this.left.length; index ++) {
                let tempBoat = this;
                tempBoat = this.swap(tempBoat,index,randoIndex);
                if (Math.abs(tempBoat.calculateMomentDiff()) < bestAbsMoment) {
                    bestAbsMoment = Math.abs(tempBoat.calculateMomentDiff());
                    personIndex = index;
                }
            }
            if (personIndex != null) {
                let tempBoat = this.swap(this, personIndex, randoIndex);
                if (Math.abs(tempBoat.calculateMomentDiff()) < Math.abs(original)) {
                    this.left = tempBoat.left;
                    this.right = tempBoat.right;
                }
            }
            
        }
        //
    }
}

module.exports = boat;