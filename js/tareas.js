fetch('https://my-json-server.typicode.com/topette/M3U2TrelloApp-topette/db')
  .then(response => response.json())
  .then(json => console.log(json))