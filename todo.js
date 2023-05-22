// Initialize todo list
let todoList = [];

// Get HTML elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoListContainer = document.getElementById('todo-list');

// Add event listener to form submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const todoText = input.value.trim();
    if (todoText !== '') {
        addTodoToList(todoText);
        input.value = '';
    }
});

// Add a new todo to the list
function addTodoToList(description) {
    const todo = {
        description: description,
        completed: false
    };
    todoList.push(todo);
    renderTodoList();
}

// Toggle the completed status of a todo
function toggleTodoCompleted(index) {
    if (index >= 0 && index < todoList.length) {
        todoList[index].completed = !todoList[index].completed;
        renderTodoList();
    }
}

// Remove a todo from the list
function removeTodoFromList(index) {
    if (index >= 0 && index < todoList.length) {
        todoList.splice(index, 1);
        renderTodoList();
    }
}

// Render the todo list
function renderTodoList() {
    const pendingListContainer = document.createElement('div');
    const completedListContainer = document.createElement('div');
    pendingListContainer.innerHTML = '<h2 class="pending">Pending Tasks</h2><ul id="pending-todo-list"></ul>';
    completedListContainer.innerHTML = '<h2 class="complete">Completed Tasks</h2><ul id="completed-todo-list"></ul>';
    
    const pendingTodoList = pendingListContainer.querySelector('#pending-todo-list');
    const completedTodoList = completedListContainer.querySelector('#completed-todo-list');
    
    todoList.forEach(function(todo, index) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodoCompleted(${index})">
            <span class="${todo.completed ? 'completed' : ''}">${todo.description}</span>
            <button onclick="editTodoItem(${index})">Edit</button>
            <button onclick="removeTodoFromList(${index})">Delete</button>
        `;

        if (todo.completed) {
            completedTodoList.appendChild(listItem);
        } else {
            pendingTodoList.appendChild(listItem);
        }
    });

    todoListContainer.innerHTML = '';
    todoListContainer.appendChild(pendingListContainer);
    todoListContainer.appendChild(completedListContainer);
}

// Edit a todo item
function editTodoItem(index) {
    const newDescription = prompt('Enter a new description');
    if (newDescription !== null && newDescription.trim() !== '') {
        todoList[index].description = newDescription.trim();
        renderTodoList();
    }
}

// Initial rendering of the todo list
renderTodoList();
