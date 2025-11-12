const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Carrega as tarefas do localStorage ou inicializa um array vazio
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para SALVAR as tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    todoList.innerHTML = ''; // Limpa a lista atual

    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn" data-id="${task.id}">Remover</button>
        `;
        li.dataset.id = task.id;
        todoList.appendChild(li);
    });
}

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = todoInput.value.trim();

    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        todoInput.value = '';
    }
});

todoList.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('delete-btn')) {
        const taskId = parseInt(target.dataset.id);
        tasks = tasks.filter(task => task.id !== taskId);
    } else if (target.closest('li')) {
        const taskId = parseInt(target.closest('li').dataset.id);
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
        }
    }
    
    saveTasks();
    renderTasks();
});