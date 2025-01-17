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

function agregarTarea(tarea, descripcion, prioridad) {
    listaDeTareas.push({ tarea: tarea, descripcion: descripcion, prioridad: prioridad, completada: false });
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
            li.innerHTML = `
                <span>${item.tarea} (${item.prioridad}) - ${item.descripcion}</span>
                <div class="actions">
                    <button onclick="marcarComoCompletada(${index})">${item.completada ? 'Desmarcar' : 'Marcar'} como completada</button>
                    <button onclick="editarTarea(${index})">Editar</button>
                    <button onclick="eliminarTarea(${index})">Eliminar</button>
                </div>
            `;
            if (item.completada) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);
        });
    }
}

function marcarComoCompletada(index) {
    listaDeTareas[index].completada = !listaDeTareas[index].completada;
    guardarTareas();
    mostrarTareas();
}

function editarTarea(index) {
    const tareaNueva = prompt("Ingrese la nueva tarea:", listaDeTareas[index].tarea);
    const descripcionNueva = prompt("Ingrese la nueva descripción:", listaDeTareas[index].descripcion);
    const prioridadNueva = prompt("Ingrese la nueva prioridad (Alta, Media, Baja):", listaDeTareas[index].prioridad);
    if (tareaNueva && descripcionNueva && prioridadNueva) {
        listaDeTareas[index].tarea = tareaNueva;
        listaDeTareas[index].descripcion = descripcionNueva;
        listaDeTareas[index].prioridad = prioridadNueva;
        guardarTareas();
        mostrarTareas();
    }
}

function eliminarTarea(index) {
    listaDeTareas.splice(index, 1);
    guardarTareas();
    mostrarTareas();
}

document.getElementById('taskForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskDescription = document.getElementById('taskDescription');
    const taskPriority = document.getElementById('taskPriority');
    const tarea = taskInput.value.trim();
    const descripcion = taskDescription.value.trim();
    const prioridad = taskPriority.value;
    if (tarea && descripcion && prioridad) {
        agregarTarea(tarea, descripcion, prioridad);
        taskInput.value = '';
        taskDescription.value = '';
        taskPriority.value = 'Alta';
    }
});

cargarTareas();
