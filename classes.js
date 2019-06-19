var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = /** @class */ (function () {
    function User(name, email, age, pw) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.pw = pw;
        console.log('User Created ' + typeof this.email);
    }
    User.prototype.register = function () {
        console.log(this.name + ' is now registered');
    };
    User.prototype.payInvoice = function () {
        console.log(this.name + ' payed invoice');
    };
    return User;
}());
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member(id, name, email, age, pw) {
        var _this = _super.call(this, name, email, age, pw) || this;
        _this.id = id;
        return _this;
    }
    Member.prototype.payInvoice = function () {
        _super.prototype.payInvoice.call(this);
    };
    Member.prototype.register = function () {
        _super.prototype.register.call(this);
    };
    return Member;
}(User));
var user1 = new User('Jhon', 'jhon@gmail.com', 9, 'th4hh');
console.log(user1);
var member1 = new Member(1, 'Joseph', 'joseph@speech.com', 44, 'oodhcd4e0');
user1.register();
member1.payInvoice();
member1.register();
