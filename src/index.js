import "../styles/index.css";
import "../index.html";

import { getTodoItem } from "./addTodoItem";
import { saveTodoToSStorage, getTodosFromSStorage, checkSessionStorageContent} from "./sessionStorage";
import { filterTodoItems } from "./filterTodoItems";
import {
  clearTodoInput,
  getTodoInputItems,
  validateTodoInput,
} from "./todoInput";


const { todoInput, todoButton } = getTodoInputItems();
const todoList = document.querySelector(".todo-list");
const todoSelect = document.querySelector(".todo-select");

document.addEventListener("DOMContentLoaded", onDOMLoaded);
todoInput.addEventListener("input", validateTodoInput);
todoButton.addEventListener("click", addTodo);
todoSelect.addEventListener("change", filterTodos);

function onDOMLoaded() {
  renderTodosFromSStorage();
  validateTodoInput();
  checkSessionStorageContent();
}

function renderTodosFromSStorage() {
  let todos = getTodosFromSStorage();

  // todos.forEach((todoValue) => {
  //   const todoItem = getTodoItem(todoValue);
  for (let key in todos) {
    const todoItem = getTodoItem(todos[key].value, todos[key].status);
    // Add todo item to list
    todoList.appendChild(todoItem);
  }
  // });
}

function addTodo(event) {
  event.preventDefault();

  saveTodoToSStorage(todoInput.value, true);

  const todoItem = getTodoItem(todoInput.value);
  todoList.appendChild(todoItem);

  clearTodoInput();
  checkSessionStorageContent();
  const {todoHelper} = getTodoInputItems();  
  todoHelper.classList.remove("todo-helper_visible");  
}

function filterTodos(e) {
  const todoItems = todoList.childNodes;

  filterTodoItems(todoItems, e.target.value);
}

// TODO fix bugs:
// 1. select should be disabled when no option is displayed
// 2. forbid form submit with enter key, when input value is less than 3 characters
// 3. when todoInput is not in focus, helper text should not be displayed
// 4. save to session storage todo state: completed, not completed - and update it
