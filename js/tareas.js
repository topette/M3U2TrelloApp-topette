// Elementos del formulario
let tituloTarea = document.getElementById("tituloTarea")
let descripcionTarea = document.getElementById("descripcionTarea")
let fechaTarea = document.getElementById("fechaTarea")
let responsableTarea = document.getElementById("responsableTarea")
// Botones
let botonGuardar = document.getElementById("botonGuardar")
let botonBorrar = document.getElementById("botonBorrar")
let botonEditar = document.getElementById("botonEditar")
// Posiciones
let porHacer = document.getElementById("porHacer")
let progreso = document.getElementById('progreso');
let finalizada = document.getElementById('finalizada');
// Editar
let ocultoId = document.getElementById("ocultoId")
let tituloTareaEditar = document.getElementById("tituloTareaEditar")
let descripcionTareaEditar = document.getElementById("descripcionTareaEditar")
let responsableTareaEditar = document.getElementById("responsableTareaEditar")
let fechaTareaEditar = document.getElementById("fechaTareaEditar")

// Llamando base de datos de Firebase
const urlData = 'https://trelloleo-f16c3-default-rtdb.firebaseio.com/'

// Creando tarea
const createData = async (titulo, descripcion, responsable, fecha) => {
  try {
    const respuesta = await axios.post(urlData + 'tareas.json', { Titulo: `${titulo}`, Descripcion: `${descripcion}`, Responsable: `${responsable}`, Fecha: `${fecha}`, Estado: "porHacer" });
    const datos = await respuesta.data
    console.log("ID: " + datos.name)
    limpiar()
  } catch (error) {
    console.log(error);
  }
}

// Trayendo todos los datos
const readData = async () => {
  try {
    const respuesta = await axios.get(urlData + 'tareas.json');
    console.log(respuesta.status) // Respuesta del servidor
    const datos = await respuesta.data
    console.log(datos)
    for (let x in datos) {
      const cardDatos = `
                  <div class="card m-2" id="${x}"> 
                  <div class="card-body">
                  <h5 class="card-title text-black d-flex">${datos[x].Titulo}</h5>
                  <p class="card-text text-black d-flex">${datos[x].Descripcion}</p>
                  <h6 class="card-text text-black d-flex">${datos[x].Responsable}</h6>
                  <p class="card-text text-black d-flex">${datos[x].Fecha}</p>
                  <button type="button" class="btn btn-outline-danger btn-sm" id="botonBorrar" onclick="eliminar('${x}')">Borrar</button>
                  <button type="button" class="btn btn-outline-warning btn-sm" onclick="readDataEditar('${x}')" data-bs-toggle="modal" data-bs-target="#exampleModal2">Editar</button>
                  </div>
                  </div>`
      if (datos[x].Estado == "porHacer") {
        porHacer.innerHTML += cardDatos
      }
      if (datos[x].Estado == "progreso") {
        progreso.innerHTML += cardDatos
      }
      if (datos[x].Estado == "finalizada") {
        finalizada.innerHTML += cardDatos
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// boton guardar datos y crear tarea
botonGuardar.addEventListener("click", () => {
      const titulo = tituloTarea.value
      const descripcion = descripcionTarea.value
      const responsable = responsableTarea.value
      const fecha = fechaTarea.value
      /*if(titulo.length == 0 || descripcion.length == 0 || responsable.selectedIndex == 0 || fecha.length == 0) {
        return;
      }*/
      createData(titulo, descripcion, responsable, fecha)
})

// Leyendo datos
readData()

// update posicion con axios
const updateData = async (id, posicion) => {
  try {
    const respuesta = await axios.patch(urlData + `tareas/${id}.json`, { Estado: posicion })
    const datos = await respuesta.data
    console.log(datos)
  }
  catch (error) {
    console.log(error);
  }
}

// Borrar con Axios
const eliminar = async (id) => {
  try {
    const respuesta = await axios.delete(urlData + `tareas/${id}.json`)
    const datos = await respuesta
		    console.log(datos)
  } catch (error) {
    console.log(error);
  }
  limpiar()
}

const limpiar = () => {
  porHacer.innerHTML = "";
  progreso.innerHTML = "";
  finalizada.innerHTML = "";
  readData()
}

// Editar datos
const guardarEditar = async () => {
  try {
    const respuesta = await axios.patch(urlData + `tareas/${ocultoId.value}.json`, {
      Titulo: `${tituloTareaEditar.value}`,
      Descripcion: `${descripcionTareaEditar.value}`,
      Responsable: `${responsableTareaEditar.value}`,
      Fecha: `${fechaTareaEditar.value}`
    })
    const datos = await respuesta
		console.log(datos)
  } catch (error) {
    console.log(error);
    limpiar()
  }
}

const readDataEditar = async (id) => {
  try {
    const respuesta = await axios.get(urlData + `tareas/${id}.json`);
    console.log(respuesta.status) // Respuesta del servidor
    const datos = await respuesta.data
    console.log(datos)

    ocultoId.value = id
    tituloTareaEditar.value = datos.Titulo
    descripcionTareaEditar.value = datos.Descripcion
    responsableTareaEditar.value = datos.Responsable
    fechaTareaEditar.value = datos.Fecha
    
  } catch (error) {
    console.log(error);
  }

}

//sortable
new Sortable(porHacer, {
  group: 'tareas',
  animation: 150,
  onStart: (evento) => {
    console.log("Id: " + evento.item.id)
    console.log("Desde: " + evento.from.id)
  },
  onEnd: (evento) => {
    console.log("Hacia: " + evento.to.id)
    updateData(evento.item.id, evento.to.id)
  }
});

new Sortable(progreso, {
  group: 'tareas',
  animation: 150,
  onStart: (evento) => {
    console.log("Id: " + evento.item.id)
    console.log("Desde: " + evento.from.id)
  },
  onEnd: (evento) => {
    console.log("Hacia: " + evento.to.id)
    updateData(evento.item.id, evento.to.id)
  }

});

new Sortable(finalizada, {
  group: 'tareas',
  animation: 150,
  onStart: (evento) => {
    console.log("Id: " + evento.item.id)
    console.log("Desde: " + evento.from.id)
  },
  onEnd: (evento) => {
    console.log("Hacia: " + evento.to.id)
    updateData(evento.item.id, evento.to.id)
  }
});