
const input = document.getElementById('todo-input');
const form = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');


function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            addTaskToList(task.text, task.completed);
        });
    }
}


function addTaskToList(text, completed = false) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (completed) {
        li.classList.add('completed');
    }

    li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
        <span class="task-text">${text}</span>
        <div>
            <button class="delete-btn">Видалити</button>
        </div>
    `;


    const checkbox = li.querySelector('.checkbox');
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        updateTasks();
    });


    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        todoList.removeChild(li);
        updateTasks();
    });

    todoList.appendChild(li);
}


function updateTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        const taskText = li.querySelector('.task-text').textContent;
        const completed = li.classList.contains('completed');
        tasks.push({ text: taskText, completed });
    });
    saveTasks(tasks);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText) {
        addTaskToList(taskText);
        updateTasks();
        input.value = '';
    }
});


window.addEventListener('DOMContentLoaded', loadTasks);
