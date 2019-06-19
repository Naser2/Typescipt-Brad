function getSum(num1, num2) {
    return num1 + num2;
}
var mySum = function (num1, num2) {
    if (typeof num1 == 'string') {
        console.log(num1);
        num1 = parseInt(num1);
    }
    if (typeof num2 == 'string') {
        num2 = parseInt(num2);
    }
    return num1 + num2;
};
var getName = function (firstName, lastName) {
    if (typeof firstName == undefined || typeof lastName == 'number') {
        return lastName + ' ' + 'please enter valid firstname';
    }
    else {
        return lastName;
    }
};
console.log(getName('4', 22));
