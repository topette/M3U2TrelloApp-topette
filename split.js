let palabras = new String("esta es una frase larga de ocho palabras")
let array = palabras.split(' ')
mostrarpalabras(array)

function mostrarpalabras(array){
    console.log(array.length)
    console.log(array[0])
    console.log(array[array.length -1])
    console.log(array.reverse())
    console.log(array.sort())
    console.log(array.sort().reverse())
}

/*

1. Leer una cadena de texto pasada por parámetros a una función
    - generar un array con la función split().
    - mostrar la siguiente información: 
        - Número de palabras 
        - primera palabra 
        - última palabra 
        - las palabras colocadas en orden inverso 
        - las palabras ordenadas de la “a” a la “z” 
        - las palabras ordenadas de la “z” a la “a”. 
    Sacar toda esta información en consola.

*/