const addTodoBtn = document.getElementById("addTodoBtn");
let todoText; // This should be populated when de user click on Add button.
const inputTag = document.getElementById("todoInput");
const todoListUl = document.getElementById("todoList");
let todos = [];
let todosString = localStorage.getItem("todos");

// If we have todos in the localStorage, we will read it. 
if (todosString) {
    todos = JSON.parse(todosString);
}

const populateTodos = () => {
    let string = "";
    for (const todo of todos) {
        string += `<li  id="todo-${todo.id}" class="todo-item ${todo.isCompleted ? "completed" : ""}" >
                    <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                    <span class="todo-text">${todo.title}</span>
                    <button class="delete-btn">×</button>
                </li>`
    }
    todoListUl.innerHTML = string

    // Handle the delete buttons
    const deleteBtns = document.querySelectorAll(".delete-btn");

    deleteBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            todos = todos.filter((todo) => {
                return ("todo-" + todo.id) !== (e.target.parentNode.id)
            })
            localStorage.setItem("todos", JSON.stringify(todos));
            populateTodos();
        });
    });

    // Add the checkbox logic to populateTodos
    const todoCheckboxes = document.querySelectorAll((".todo-checkbox"));

    todoCheckboxes.forEach((element) => {
        element.addEventListener("click", (e) => {
            if (e.target.checked) {
                element.parentNode.classList.add("completed");


                todos = todos.map(todo => {
                    console.log(todo.id);
                    console.log(element.parentNode.id)
                    if ("todo-" + todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: true }
                    } else {
                        return todo
                    }
                });
                localStorage.setItem("todos", JSON.stringify(todos));

            } else {
                element.parentNode.classList.remove("completed");
                todos = todos.map(todo => {
                    if ("todo-" + todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: false }
                    } else {
                        return todo
                    }
                });
                localStorage.setItem("todos", JSON.stringify(todos));
            }
        });
    });
}

addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value;
    inputTag.value = "";
    if (todoText.trim() === "") {
        alert("You can't add blank Tasks");
    } else {
        let todo = {
            id: "todo-" + Date.now(),
            title: todoText,
            isCompleted: false
        }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos))
        populateTodos()
    }
})
populateTodos()





