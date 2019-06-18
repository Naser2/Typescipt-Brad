function getSum(num1: number, num2: number): number {
  return num1 + num2;
}

let mySum = function(num1: any, num2: any): number {
  if (typeof num1 == 'string') {
    console.log(num1);
    num1 = parseInt(num1);
  }
  if (typeof num2 == 'string') {
    num2 = parseInt(num2);
  }
  return num1 + num2;
};

let getName = (firstName: string, lastName: string): string => {
  if (typeof firstName == undefined || typeof lastName == 'number') {
    return lastName + ' ' + 'please enter valid firstname';
  } else {
    return lastName;
  }
};

console.log(getName('4', 22));
