let showTodo = (todo: { title: string; content: string }) => {
  return todo.title + ':  ' + todo.content;
};
let todo = {
  title: 'Tutorial',
  content: "Y'all watch my new javascript tutorial",
  rating: 4
};

interface Todo {
  title: string;
  content: string;
  rating: number;
}

let showTodoInterface = (todo: Todo) => {
  return `
  Title: ${todo.title.slice(0, 2)}
  Content:  ${todo.content}
   Rating: ${todo.rating}`;
};
console.log(showTodoInterface(todo));
