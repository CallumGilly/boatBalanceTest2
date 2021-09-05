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

    calculateMoment(leftArr = this.left, rightArr = this.right) {
        //Input: N/A
        //Output: {Number, Number} = {leftMoment - RightMoment, FrontMoment - BackMoment}
        //Thus if negative than right heavy or back heavy

        

        let leftMoment = this.calculateSideMoment(leftArr);
        let rightMoment = this.calculateSideMoment(rightArr);

        let leftRightMoment = leftMoment - rightMoment;

        //Take center of boat to be seat 5
        //Take seat widths to be 0.8m between each seat

        let frontBackMoment = 0;

        //moment of seat = seat dist from 4/5 * 0.8 * weight
        for (var seatNum = 0; seatNum < leftArr.length; seatNum ++) {
            if (seatNum <= 4) {
                let multiplier = ((4 - seatNum) * 0.8) + 0.7;
                frontBackMoment += multiplier * leftArr[seatNum].weight;
                frontBackMoment += multiplier * rightArr[seatNum].weight;
            } else { // (seatNum > 4)
                let multiplier = ((seatNum - 5) * 0.8 + 0.1);
                frontBackMoment -= multiplier * leftArr[seatNum].weight;
                frontBackMoment -= multiplier * rightArr[seatNum].weight
            };
        }
        return {leftRightMoment, frontBackMoment};
    }

    arraySwap(parsedArray1, pos1, pos2, parsedArray2) {
        if (parsedArray2 == undefined) {
            let temp = parsedArray1[pos1];
            parsedArray1[pos1] = parsedArray1[pos2];
            parsedArray1[pos2] = temp;
            return parsedArray1;
        } else {
            let temp = parsedArray1[pos1];
            parsedArray1[pos1] = parsedArray2[pos2];
            parsedArray2[pos2] = temp;
            return {parsedArray1,parsedArray2};
        }
    }

    optimiseFrontBack() {
        const initialMoment = this.calculateMoment();
        let bestMoment = Math.abs(initialMoment.frontBackMoment);
        const initialLeft = this.left;
        const initialRight = this.right;
        let bestLeft = -1;
        let bestRight = -1;
        //If negative back heavy/ right heavy
        let range = [0, 0, 0, 0];
        if (initialMoment.frontBackMoment < 0) {
            range = [5, 9, 0, 4];
        } else {
            range = [0, 4, 5, 9];
        }
        for (var initial = range[0]; initial <= range[1]; initial++) {
            for (var secondary = range[2]; secondary <= range[3]; secondary++) {
                let testLeft = initialLeft;
                let testRight = initialRight;
                if (initialMoment.leftRightMoment < 0) {
                    let tempValue = testLeft[secondary];
                    testLeft[secondary] = testRight[initial];
                    testRight[initial] = tempValue;
                } else {
                    let tempValue = testLeft[initial];
                    testLeft[initial] = testRight[secondary];
                    testRight[secondary] = tempValue;
                }
                
                let swappedMoment = this.calculateMoment(testLeft,testRight);
                if (Math.abs(swappedMoment.frontBackMoment) < bestMoment) {
                    if (initialMoment.leftRightMoment < 0) {
                        bestLeft = secondary;
                        bestRight = initial;
                    } else {
                        bestLeft = initial;
                        bestRight = secondary;
                    }
                    bestMoment = Math.abs(swappedMoment.frontBackMoment);
                }

                if (initialMoment.leftRightMoment < 0) {
                    let tempValue = testLeft[secondary];
                    testLeft[secondary] = testRight[initial];
                    testRight[initial] = tempValue;
                } else {
                    let tempValue = testLeft[initial];
                    testLeft[initial] = testRight[secondary];
                    testRight[secondary] = tempValue;
                }  

            }
        }

        if (bestLeft !== -1) {
            let temp = this.left[bestLeft];
            this.left[bestLeft] = this.right[bestRight];
            this.right[bestRight] = temp;
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