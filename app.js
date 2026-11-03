const addTodoBtn = document.getElementById("addTodoBtn");
let todoText; // This should be populated when de user click on Add button.
const inputTag = document.getElementById("todoInput");
let todos = [];
let todosString = localStorage.getItem("todos"); 

// If we have todos in the localStorage, we will read it. 
if(todosString){
    todos = JSON.parse(todosString);
}

addTodoBtn.addEventListener("click", () => {
    console.log("Hola");
    todoText = inputTag.value;
    console.log(todoText);
    inputTag.value = "";
    let todo = {
        title: todoText,
        isCompleted: false
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
});