let listaDeTareas = [];

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        listaDeTareas = JSON.parse(tareasGuardadas);
    }
    mostrarTareas();
}

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(listaDeTareas));
}

function agregarTarea(tarea) {
    listaDeTareas.push({ tarea: tarea, completada: false });
    guardarTareas();
    mostrarTareas();
}

function mostrarTareas() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    if (listaDeTareas.length === 0) {
        taskList.innerHTML = '<li>No hay tareas en la lista.</li>';
    } else {
        listaDeTareas.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.tarea;
            if (item.completada) {
                li.classList.add('completed');
            }
            li.addEventListener('click', () => marcarComoCompletada(index));
            taskList.appendChild(li);
        });
    }
}

document.getElementById('taskForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const tarea = taskInput.value.trim();
    if (tarea) {
        agregarTarea(tarea);
        taskInput.value = '';
    }
});


cargarTareas();
