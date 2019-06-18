interface UserInterface {
  name: string;
  email: string;
  age: number;
  pw: any;
  register();
  payInvoice();
}

class User implements UserInterface {
  name;
  email;
  age;
  pw;

  constructor(name, email, age, pw) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.pw = pw;
    console.log('User Created ' + typeof this.email);
  }
  register() {
    console.log(this.name + ' is now registered');
  }
  payInvoice() {
    console.log(this.name + ' payed invoice');
  }
}

class Member extends User {
  id: number;

  constructor(id: number, name: string, email: string, age: number, pw: any) {
    super(name, email, age, pw);
    this.id = id;
  }
  payInvoice() {
    super.payInvoice();
  }
  register() {
    super.register();
  }
}

let user1 = new User('Jhon', 'jhon@gmail.com', 9, 'th4hh');
console.log(user1);

let member1 = new Member(1, 'Joseph', 'joseph@speech.com', 44, 'oodhcd4e0');
user1.register();
member1.payInvoice();
member1.register();
