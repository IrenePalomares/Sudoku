//Array que contiene el sudoku
var Array = [[5,1,4,8,2,9,3,7,6],[3,8,9,6,5,7,2,1,4],[2,6,7,4,3,1,8,5,9],[8,3,6,9,4,5,7,2,1],[4,5,1,7,8,2,9,6,3],[7,9,2,3,1,6,4,8,5],[9,2,3,1,6,8,5,4,7],[1,7,
8,5,9,4,6,3,2],[6,4,5,2,7,3,1,9,8]];


//clase que guarda todas las variables
function VariablesSudoku (){
    this.pUsuario;
    this.btnComprobar;
    this.btnCerrar;
    this.btnNuevo;
    this.snivel;
    this.contar;
    this.contar2;
}

//instancio el objeto de la clase para poder acceder a las variables y darles los valores correspondientes
var VariablesSudoku = new Object();
VariablesSudoku.contar=0;
VariablesSudoku.contar2=0;
    
//función que genera la tabla del sudoku en html
function tablaSudoku() {
    let tabla = document.createElement("table");

    for (let i = 0; i < Array.length; i++) {
        let filas = document.createElement("tr");
        tabla.appendChild(filas);
        for (let j = 0; j < 9; j++) {
            let columnas = document.createElement("td");
            let celdas = document.createElement("input");
            columnas.appendChild(celdas);
            filas.appendChild(columnas);
            celdas.setAttribute("style", "width:50px; height:50px;");
            celdas.setAttribute("type","number");
            celdas.setAttribute("max","9");
            celdas.setAttribute("min","1");
            //metemos un atributo llamado id a cada input que hay en la tabla
            celdas.setAttribute("id",`id${VariablesSudoku.contar}`);
            
            VariablesSudoku.contar++;
            //dependiendo del nivel le asignamos al value del input (siempre el mismo número del array que contiene el sudoku) la probabilidad de 
            //aparecer como value o no, con esto conseguimos que se enseñen más o menos números al inicio de la partida, esos números no se pueden modificar
            if(localStorage.getItem('Nivel')=='facil'){
                var numero = Math.floor(Math.random() * (3-1)+1);
                if(numero==1){
                    celdas.setAttribute("value",Array[i][j]);
                    celdas.disabled=true;
                    celdas.setAttribute("style","color:black; font-weight: bold; width:50px; height:50px;");
                }
            } else if(localStorage.getItem('Nivel')=='medio'){
                var numero = Math.floor(Math.random() * (6-1)+1);
                if(numero==1||numero==2){
                    celdas.setAttribute("value",Array[i][j]);
                    celdas.disabled=true;
                    celdas.setAttribute("style","color:black; font-weight: bold; width:50px; height:50px;");
                }
            }else if(localStorage.getItem('Nivel')=='dificil'){
                var numero = Math.floor(Math.random() * (9-1)+1);
                if(numero==1||numero==2||numero==3){
                    celdas.setAttribute("value",Array[i][j]);
                    celdas.disabled=true;
                    celdas.setAttribute("style","color:black; font-weight: bold; width:50px; height:50px;");
                }
            }
        }
    }
    tabla.setAttribute("id", "tabla");
    var result = document.getElementById("resultado");
        result.appendChild(tabla);
        tabla.setAttribute("border", "2");
}
tablaSudoku();

//función que mediante el fondo del usuario almacenado en localStorage se lo asignamos al body de html para que salga el fondo personalizado de cada usuario
var body = document.getElementById('fondopantalla');
function fondo() {
    body.setAttribute("style", `background-image: url(${localStorage.getItem('Fondo')}); background-repeat:repeat;`);
}
fondo();

//función que nos permite poner un único número en cada input del sudoku
function numeros() {
    //recorremos todos los id de los inputs
    for (let i = 0; i < 81; i++) {
        let idinputs = document.getElementById(`id${i}`);
        //a cada id le asignamos un evento input, esto nos permite poner números entre 0 y 9
        idinputs.addEventListener("input", function () {
            let valor = idinputs.value;
            //en este if indicamos que si se pulsa un número distinto de 0 número se coja el primer número introducido en value y sino al pulsar 0 el value es vacío 
            if (idinputs.value != 0) {
                idinputs.value = valor.charAt();
            } else{
                idinputs.value = "";
            }
        });
    }
}
numeros();

//funcion que recibe como parámetro el nombre del jugador y escribe en html un párrafo que contiene un mensaje de bienvenida con su nombre
function nombre(nombreJugador) {
    let parrafo = document.createElement("p");
    let div = document.getElementById("nombre");
        div.appendChild(parrafo);
        parrafo.id = "jugador";
    let jugador = document.getElementById('jugador');
    jugador.innerHTML = `Mucha Suerte ${nombreJugador}!`;
}
nombre(localStorage.getItem('Usuario'));

//declaro una variable con el id del botón cerrar
VariablesSudoku.btnCerrar = document.getElementById("cerrar");

//a esa variable le asocio el evento click para que cuando se presione el botón cerrar sesión se vuelva a la página index donde está el formulario
VariablesSudoku.btnCerrar.addEventListener("click", function () {
    window.location.href="./index.html";
});

//declaro una variable con el id del botón nuevo
VariablesSudoku.btnNuevo = document.getElementById("nuevo");

//a esa variable le asocio el evento click para que cuando se presione el botón nueva partida se cargue de nuevo la página del sudoku, mostrando 
//una nueva variante del mismo 
VariablesSudoku.btnNuevo.addEventListener("click", function () {
    window.location.href="./sudoku.html";
});

//declaro una variable con el id del botón comprobar
VariablesSudoku.btnComprobar = document.getElementById("comprobar");

//a esa variable le asocio el evento click para que cuando se presione el botón comprobar recorra todos los ids de los inputs,
//almacene sus values en un array bidimensional y vaya comprobando la posición una a una de ambos arrays, (tanto el que contiene la solución del 
//sudoku como el que contiene el sudoku que está resolviendo el usuario) si el número que introduce es correcto se pone en verde y sino lo es en rojo
//esto se hace cada vez que el usuario presiona el botón comprobar
VariablesSudoku.btnComprobar.addEventListener("click", function () {
    let ArrayUsuario = [[],[],[],[],[],[],[],[],[]];
        VariablesSudoku.contar2=0;
    for ( let j = 0; j < 9; j++) {
        for (let i = 0; i < 9; i++) {
            let cosa1 = document.getElementById(`id${VariablesSudoku.contar2}`);
            let cosa = cosa1.value;
                ArrayUsuario [j][i] = cosa;
                    if (Array[j][i]==ArrayUsuario[j][i]){
                        cosa1.setAttribute("style", "color:#00661D; font-weight: bold; width:50px; height:50px;");
                    } 
                    else if (ArrayUsuario[j][i] == ""){
                        cosa1.setAttribute("style", "color:black; width:50px; height:50px;");
                    }
                    else if (Array[j][i]!=ArrayUsuario[j][i] ) {
                        cosa1.setAttribute("style", "color:firebrick; font-weight: bold; width:50px; height:50px;");
                    } 
                    VariablesSudoku.contar2++;
        }
    }
});