const TODOS = "todos";

export function removeTodoFromSStorage(todoItem) {
  let todos = getTodosFromSStorage();

  const todoText = Array.from(todoItem.childNodes).find((node) =>
    node.classList.contains("todo-text")
  );

  if (todoText) {
    const filtredTodos = todos.filter((item) => item.value !== todoText.innerText);
    sessionStorage.setItem(TODOS, JSON.stringify(filtredTodos));
  }
}

export function makeCompleteTodoInSStorage(todoItem, bool) {
  let todos = getTodosFromSStorage();
  const todoText = Array.from(todoItem.childNodes).find((node) =>
    node.classList.contains("todo-text")
  );
  if (todoText) {
    for (let key in todos) {

      if (todos[key].value === todoText.innerText) {
        todos[key].status = bool;
      }      
    }
    sessionStorage.setItem(TODOS, JSON.stringify(todos));
  }
}
 
export function saveTodoToSStorage(todo) {
  let todos = getTodosFromSStorage();
  let status = false;
  todos.push({ value: todo, status: status });

  sessionStorage.setItem(TODOS, JSON.stringify(todos));
}

export function getTodosFromSStorage() {
  const storageTodos = sessionStorage.getItem(TODOS);
  return storageTodos ? JSON.parse(storageTodos) : [];
}

export function checkSessionStorageContent(){
  const todoSelectWrapper = document.querySelector(".todo-select-wrapper");
  const todoSelectText = document.querySelector(".todo-select");    
  if (getTodosFromSStorage().length > 0) {
    todoSelectWrapper.classList.remove("todo-select-wrapper_disabled");
    todoSelectWrapper.classList.remove("todo-select-wrapper_disabled::after");
    todoSelectText.classList.remove("select_disabled");
  } else {
    todoSelectWrapper.classList.add("todo-select-wrapper_disabled");
    todoSelectWrapper.classList.add("todo-select-wrapper_disabled::after");
    todoSelectText.classList.add("select_disabled");
  }
}
