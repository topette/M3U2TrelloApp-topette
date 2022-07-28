// elementos del formulario
let tituloTarea = document.getElementById("tituloTarea")
let descripcionTarea = document.getElementById("descripcionTarea")
let fechaTarea = document.getElementById("fechaTarea")
let responsableTarea = document.getElementById("responsableTarea")
// botones
let botonGuardar = document.getElementById("botonGuardar")
let botonBorrar = document.getElementById("botonBorrar")
let botonEditar = document.getElementById("botonEditar")
// posiciones
let porHacer = document.getElementById("porHacer")
let progreso = document.getElementById('progreso');
let finalizada = document.getElementById('finalizada');

// Creando tarea

const createData = async(titulo, descripcion, responsable, fecha) => {	
	try {		
		const respuesta =await axios.post('https://trelloleo-f16c3-default-rtdb.firebaseio.com/tareas.json', { Titulo: `${titulo}`, Descripcion:`${descripcion}`, Responsable:`${responsable}`, Fecha:`${fecha}`, Estado: "porHacer" });        
        const datos = await respuesta.data
		console.log("ID: " + datos.name)	
    limpiar()
	} catch(error){
		console.log(error);
	}
}

// llamado

// Trae todos los datos
const readData = async() => {	
	try {		
		const respuesta = await axios.get('https://trelloleo-f16c3-default-rtdb.firebaseio.com/tareas.json');
		console.log(respuesta.status) // Respuesta del servidor
                const datos = await respuesta.data
                console.log(datos)
                for(let x in datos){   
                  
                  if (datos[x].Estado == "porHacer") {
                    porHacer.innerHTML += `
                <div class="card m-2" id="${x}"> 
                <div class="card-body">
                <h5 class="card-title text-black d-flex">${datos[x].Titulo}</h5>
                <p class="card-text text-black d-flex">${datos[x].Descripcion}</p>
                <h6 class="card-text text-black d-flex">${datos[x].Responsable}</h6>
                <p class="card-text text-black d-flex">${datos[x].Fecha}</p>
                <button type="button" class="btn btn-outline-danger btn-sm" id="botonBorrar" onclick="eliminar('${x}')">Borrar</button>
                <button type="button" class="btn btn-outline-warning btn-sm" id="botonEditar" onclick="editar('${x}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                </div>
                </div>`
                  } 
                  if (datos[x].Estado == "progreso") {
                    progreso.innerHTML += `
                <div class="card m-2" id="${x}"> 
                <div class="card-body">
                <h5 class="card-title text-black d-flex">${datos[x].Titulo}</h5>
                <p class="card-text text-black d-flex">${datos[x].Descripcion}</p>
                <h6 class="card-text text-black d-flex">${datos[x].Responsable}</h6>
                <p class="card-text text-black d-flex">${datos[x].Fecha}</p>
                <button type="button" class="btn btn-outline-danger btn-sm" id="botonBorrar" onclick="eliminar('${x}')">Borrar</button>
                <button type="button" class="btn btn-outline-warning btn-sm" id="botonEditar" onclick="editar('${x}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                </div>
                </div>`
                  }

                  if (datos[x].Estado == "finalizada") {
                    finalizada.innerHTML += `
                <div class="card m-2" id="${x}"> 
                <div class="card-body">
                <h5 class="card-title text-black d-flex">${datos[x].Titulo}</h5>
                <p class="card-text text-black d-flex">${datos[x].Descripcion}</p>
                <h6 class="card-text text-black d-flex">${datos[x].Responsable}</h6>
                <p class="card-text text-black d-flex">${datos[x].Fecha}</p>
                <button type="button" class="btn btn-outline-danger btn-sm" id="botonBorrar" onclick="eliminar('${x}')">Borrar</button>
                <button type="button" class="btn btn-outline-warning btn-sm" id="botonEditar" onclick="editar('${x}')" data-bs-toggle="modal" data-bs-target="#exampleModal" >Editar</button>
                </div>
                </div>`
                  }
                 // Por si se envia por ejemplo a un elemento del DOM
                }

	} catch(error){
		console.log(error);
	}
}

// boton guardar datos y crear tarea

botonGuardar.addEventListener("click", ( ) => {
  const titulo = tituloTarea.value
  const descripcion = descripcionTarea.value
  const responsable = responsableTarea.value
  const fecha = fechaTarea.value
  createData(titulo, descripcion, responsable, fecha)
} )


// Editar datos


const editar = async(id, titulo, descripcion, responsable, fecha) =>{
    document.getElementById("id").value = id
    document.getElementById("titulo").value = titulo
    document.getElementById("descripcion").value = descripcion
    document.getElementById("responsable").value = responsable
    document.getElementById("fecha").value = fecha
    
  try {
      const editarData = await axios.patch(`https://trelloleo-f16c3-default-rtdb.firebaseio.com/tareas/${id}.json`); 
      return editarData.update({
      Titulo: `${titulo}`,
      Descripcion:`${descripcion}`,
      Responsable:`${responsable}`,
      Fecha:`${fecha}`
    })
  }
  catch(error){
    console.log(error);
  }
}



readData()

// update posicion con axios
const updateData = async(id, posicion) => {
  try {	 
  		const respuesta = await axios.patch(`https://trelloleo-f16c3-default-rtdb.firebaseio.com/tareas/${id}.json`, { Estado: posicion});      
      const datos = await respuesta.data
		  console.log(datos)	
}
catch(error){
  console.log(error);
}
}  


// borrar datos
// Delete con Axios
const eliminar = async(id) => {	
	try {		
		const respuesta = await axios.delete(`https://trelloleo-f16c3-default-rtdb.firebaseio.com/tareas/${id}.json`);        
        const datos = await respuesta
		    console.log(datos)	
	} catch(error){
		console.log(error);
	}
  limpiar()
}

const limpiar = ()=>{
  porHacer.innerHTML = "";
  progreso.innerHTML = "";
  finalizada.innerHTML = "";
  readData()
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



