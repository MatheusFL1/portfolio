document.addEventListener('DOMContentLoaded', function() {
    loadTasks();

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    document.getElementById('themeToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
});

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value;
    
    if (taskText === '') return;

    addTask(taskText);
    saveTask(taskText);
    
    taskInput.value = '';
});

document.querySelectorAll('.filter').forEach(filterButton => {
    filterButton.addEventListener('click', function() {
        const filter = this.dataset.filter;
        filterTasks(filter);
    });
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

function addTask(taskText, completed = false) {
    const li = document.createElement('li');
    li.classList.toggle('completed', completed);

    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    const completeButton = document.createElement('button');
    completeButton.textContent = completed ? 'Desmarcar' : 'Completar';
    completeButton.classList.add('complete');
    li.appendChild(completeButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('edit');
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.classList.add('delete');
    li.appendChild(deleteButton);

    document.getElementById('task-list').appendChild(li);

    completeButton.addEventListener('click', function() {
        li.classList.toggle('completed');
        completeButton.textContent = li.classList.contains('completed') ? 'Desmarcar' : 'Completar';
        toggleCompleteTask(taskText);
    });

    editButton.addEventListener('click', function() {
        const newText = prompt('Edite sua tarefa:', span.textContent);
        if (newText !== null && newText !== '') {
            span.textContent = newText;
            updateTask(taskText, newText);
        }
    });

    deleteButton.addEventListener('click', function() {
        document.getElementById('task-list').removeChild(li);
        removeTask(taskText);
    });
}

function toggleCompleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(filter) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    document.getElementById('task-list').innerHTML = '';
    tasks.forEach(task => {
        if (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'pending' && !task.completed)) {
            addTask(task.text, task.completed);
        }
    });
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.text === oldText ? { ...task, text: newText } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
