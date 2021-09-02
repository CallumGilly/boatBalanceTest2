class person {
    genderToISO5218 (letter) {
        if (letter == undefined) {
            return 0;
        } else if (letter.toUpperCase() == "F") {
            return 2;
        } else if (letter.toUpperCase() == "M") {
            return 1;
        } else {
            return 9;
        }
    }
    constructor (setName, setGender, setPref, setWeight) {
        this.name = setName;
        this.gender = this.genderToISO5218(setGender);
        this.perf = setPref;
        this.weight = setWeight;
    }
}

module.exports = person;