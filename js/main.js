let listaDeTareas = [];

function agregarTarea() {
    let tarea = prompt("Ingrese la tarea:");
    listaDeTareas.push({ tarea: tarea, completada: false });
}

function mostrarTareas() {
    if (listaDeTareas.length === 0) {
        console.log("La lista de tareas está vacía.");
    } else {
        console.log("Lista de tareas para el viaje:");
        for (let i = 0; i < listaDeTareas.length; i++) {
            let item = listaDeTareas[i];
            console.log(`${i + 1}. ${item.tarea}`);
        }
    }
}

function marcarComoCompletada() {
    if (listaDeTareas.length === 0) {
        console.log("No hay tareas para marcar como completadas.");
        return;
    }
    
    let tareaCompletar = prompt("Ingrese el nombre de la tarea a marcar como completada:");
    let tareaEncontrada = false;

    for (let i = 0; i < listaDeTareas.length; i++) {
        let item = listaDeTareas[i];
        if (item.tarea === tareaCompletar) {
            item.completada = true;
            tareaEncontrada = true;
            console.log(`Tarea "${tareaCompletar}" marcada como completada.`);
        }
    }
    
    if (!tareaEncontrada) {
        console.log(`No se encontró la tarea "${tareaCompletar}" en la lista.`);
    }
}


agregarTarea(); 
mostrarTareas(); 
marcarComoCompletada(); 
mostrarTareas(); 