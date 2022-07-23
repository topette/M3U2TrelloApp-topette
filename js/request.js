API_URL = 'https://my-json-server.typicode.com/topette/M3U2TrelloApp-topette/db'

const ApiClient = axios.create({
    baseURL: API_URL
})

ApiClient.get(`${API_URL}/tasks`)
    .then((res) => mostrarTareas(res.data))
    .catch((err) => console.error (err))

const mostrarTareas = (data) => {
    data.map((tarea) => crearTarea(tarea))
}

const crearTarea = (tarea) => {
    let nuevaTarea = document.createElement('article')
    nuevaTarea.classList.add('card-tarea')

    let tituloTarea = document.createElement('h3')
    nuevaTarea.classList.add('card-tarea__titulo')
    nuevaTarea.innerText = tarea.titulo

    let responsableTarea document.createElement('p')
    responsableTarea.classList.add('card-tarea__responsable')
    responsableTarea.innerText = `<p class="card-tarea__responsable">Responsable: ${tarea.persona}</p>`
}

