import { removeTodoFromSStorage, checkSessionStorageContent, makeCompleteTodoInSStorage } from "./sessionStorage";

export const getTodoItem = (text, check) => {
  // Create Todo Item
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  if (check){
    todoItem.classList.add("todo-item_completed");
  }
  // Create and add Todo Text
  const todoText = document.createElement("span");
  todoText.innerText = text;
  todoText.classList.add("todo-text");
  todoItem.appendChild(todoText);

  // Create and add Check button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("todo-check-button");
  checkButton.addEventListener("click", toggleCheckButton(todoItem));
  todoItem.appendChild(checkButton);

  // Create and add Remove button
  const removeButton = document.createElement("button");
  removeButton.innerHTML = '<i class="fas fa-trash"></i>';
  removeButton.classList.add("todo-remove-button");
  removeButton.addEventListener("click", removeTodoItem(todoItem));
  todoItem.appendChild(removeButton);

  return todoItem;
};

function removeTodoItem(todoItem) {
  return (e) => {
    e.preventDefault();
    todoItem.classList.add("todo-item_fall");
    todoItem.addEventListener("transitionend", function () {
      removeTodoFromSStorage(todoItem);
      todoItem.remove();
      checkSessionStorageContent();
    });    
  };
}

function toggleCheckButton(todoItem) {
  return (event) => {
    event.preventDefault();
    todoItem.classList.toggle("todo-item_completed");
    const bool = todoItem.classList.contains("todo-item_completed");
    todoItem.addEventListener("click", function () {
      makeCompleteTodoInSStorage(todoItem, bool);
    });
  };  
}
