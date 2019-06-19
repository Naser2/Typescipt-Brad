var showTodo = function (todo) {
    return todo.title + ':  ' + todo.content;
};
var todo = {
    title: 'Tutorial',
    content: "Y'all watch my new javascript tutorial",
    rating: 4
};
var showTodoInterface = function (todo) {
    return "\n  Title: " + todo.title.slice(0, 2) + "\n  Content:  " + todo.content + "\n   Rating: " + todo.rating;
};
console.log(showTodoInterface(todo));
