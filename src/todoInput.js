export function getTodoInputItems() {  
  const todoInput = document.querySelector(".todo-input");  
  const todoHelper = document.querySelector(".todo-helper");  
  const todoButton = document.querySelector(".todo-button");  

  return {
    todoInput,
    todoHelper,
    todoButton,
  };
}

export function validateTodoInput() {

  const { todoInput, todoHelper, todoButton } = getTodoInputItems();

    todoButton.classList.add("todo-button_disabled");

    todoHelper.classList.add("todo-helper_visible");

    todoInput.addEventListener("keypress", disableEnterKey);

    todoInput.addEventListener("input", addClassButtonHelper); 

    function addClassButtonHelper(){
      if (todoInput.value.length >= 3) {
        todoButton.classList.remove("todo-button_disabled");
        todoHelper.classList.remove("todo-helper_visible");
      } else {
        todoButton.classList.add("todo-button_disabled");
        todoHelper.classList.add("todo-helper_visible");
      }
    }

    function disableEnterKey (e){
      if (e.keyCode === 13 && todoInput.value.length < 3) {
        e.preventDefault();
      }
    }
}

export function clearTodoInput() {

  const { todoInput, todoHelper, todoButton } =
    getTodoInputItems();

  todoInput.value = "";

  todoButton.classList.add("todo-button_disabled");

  todoHelper.classList.add("todo-helper_visible");
}
