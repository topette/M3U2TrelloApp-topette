
const institutions ={
    name: "Universidad de la vida",
    location:"Auto educación",
    sites:{
        site1:{
            course1:{
                aula1:{
                    student1:{
                        name:"Fredy",
                        lastName:"Caseres",
                        age:21,
                    },
                    student2:{
                        name:"Hector",
                        lastName:"Ramirez",
                        age:28,
                    },
                    student3:{
                        name:"Marcos",
                        lastName:"Pedroza",
                        age:18,
                    },
                },
                aula2:{
                    student1:{
                        name:"Carlos",
                        lastName:"Mejia",
                        age:30,
                    },
                    student2:{
                        name:"Pedro",
                        lastName:"Rios",
                        age:35,
                    },
                    student3:{
                        name:"Oscar",
                        lastName:"Arcos",
                        age:18,
                    },
                },
            }
        }
    }
}

const user = ({name,lastName,age}) => `el estudiante ${name} ${lastName} tiene ${lastName} años"`
console.log(user())
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

2. Según el objeto literal planteado liste la información del estudiante 2, sede 1 del curso 1 del aula2 del la Universidad de la vida

const institutions ={
    name: "Universidad de la vida",
    location:"Auto educación",
    sites:{
        site1:{
            course1:{
                aula1:{
                    student1:{
                        name:"Fredy",
                        lastName:"Caseres",
                        age:21,
                    },
                    student2:{
                        name:"Hector",
                        lastName:"Ramirez",
                        age:28,
                    },
                    student3:{
                        name:"Marcos",
                        lastName:"Pedroza",
                        age:18,
                    },
                },
                aula2:{
                    student1:{
                        name:"Carlos",
                        lastName:"Mejia",
                        age:30,
                    },
                    student2:{
                        name:"Pedro",
                        lastName:"Rios",
                        age:35,
                    },
                    student3:{
                        name:"Oscar",
                        lastName:"Arcos",
                        age:18,
                    },
                },
            }
        }
    }
}



*/