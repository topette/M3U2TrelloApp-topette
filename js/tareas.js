let tituloTarea = document.getElementById("tituloTarea")
let descripcionTarea = document.getElementById("descripcionTarea")
let botonGuardar = document.getElementById("botonGuardar")
let porHacer = document.getElementById("porHacer")
let responsableTarea = document.getElementById("responsableTarea")
let fechaTarea = document.getElementById("fechaTarea")

const createData = async(titulo, descripcion, responsable, fecha) => {	
	try {		
		const respuesta =await axios.post('https://trelloleo-f16c3-default-rtdb.firebaseio.com/tareas.json', { Titulo: `${titulo}`, Descripcion:`${descripcion}`, Responsable:`${responsable}`, Fecha:`${fecha}`, Estado: "hacer" });        
        const datos = await respuesta.data
		console.log("ID: " + datos.name)	

	} catch(error){
		console.log(error);
	}
}



// llamado

// Trae todos los datos
const readData = async() => {	
	try {		
		const respuesta =await axios.get('https://trelloleo-f16c3-default-rtdb.firebaseio.com/tareas.json');
		console.log(respuesta.status) // Respuesta del servidor
                const datos = await respuesta.data
                console.log(datos)
                for(let x in datos){   
                  
                  if (datos[x].Estado == "hacer") {
                    porHacer.innerHTML += `
                <div class="card m-2" id="${x}"> 
                <div class="card-body">
                <h5 class="card-title text-black d-flex">${datos[x].Titulo}</h5>
                <p class="card-text text-black d-flex">${datos[x].Descripcion}</p>
                <h6 class="card-text text-black d-flex">${datos[x].Responsable}</h6>
                <p class="card-text text-black d-flex">${datos[x].Fecha}</p>
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
                </div>
                </div>`
                  }
                 // Por si se envia por ejemplo a un elemento del DOM
                }

	} catch(error){
		console.log(error);
	}

}

readData()

// boton guardar datos y crear tarea

botonGuardar.addEventListener("click", ( ) => {
  const titulo = tituloTarea.value
  const descripcion = descripcionTarea.value
  const responsable = responsableTarea.value
  const fecha = fechaTarea.value
  createData(titulo, descripcion, responsable, fecha)
  porHacer.innerHTML = "";
  readData();
} )

// update axios

const updateData = async(id, posicion) => {
  try {	
    const objeto = {
      {tareas: id}:
      {Estado: posicion}
    }
  		const respuesta = await axios.patch('https://trelloleo-f16c3-default-rtdb.firebaseio.com/.json', note);      
        const datos = await respuesta.data
		console.log(datos)	
}
catch(error){
  console.log(error);
}
}



//sortable

let progreso = document.getElementById('progreso');
let finalizada = document.getElementById('finalizada');

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

