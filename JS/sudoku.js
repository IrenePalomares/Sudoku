//clase que contiene variables
function Variables (){
    this.btnIniciar;
    this.btnCrear;
    this.inNombre;
    this.inContraseña;
    this.num;
    this.datos = [];
}

//función asíncrona que permite sacar con una promesa el contenido de un fichero json
async function comprobar () {
    let response = await fetch('../JS/sudoku.json');
   return  response.json();
}

//función que recibe dos parámetros y los almacena en localStorage
function SudokuStorage (Nombre,Contraseña){
    localStorage.setItem('Usuario', Nombre);
    localStorage.setItem('Contraseña', Contraseña);
}

//instancia de la clase Variables
var Variables = new Object();

//almaceno el elemento por id del botón html jugar
    Variables.btnJugar = document.getElementById("jugar");

//le asocio a ese botón un evento que cuando se presiona el botón coge los valores del formulario y los almacena en localStorage
Variables.btnJugar.addEventListener("click", function() {
    Variables.inNombre = document.getElementById("usuario").value;
    Variables.inContraseña = document.getElementById("contraseña").value;   
    SudokuStorage (Variables.inNombre,Variables.inContraseña);

//función asíncrona y anónima que coge el return de la función comprobar(), recorre el array devuelto y recoge los datos del json metiendo cada uno
//en localStorage según el usuario y la contraseña que hayamos metido, y si la información es correcta nos envía a la página del sudoku (sudoku.html)
    (async function (){
        Variables.datos = await comprobar();

        for (let i = 0; i < Variables.datos.length; i++) {
            if (localStorage.getItem('Usuario') === Variables.datos[i].nombre && localStorage.getItem('Contraseña') === Variables.datos[i].contraseña){
                localStorage.setItem('Nivel', Variables.datos[i].nivel);
                localStorage.setItem('Fondo',Variables.datos[i].fondo);
                window.location.href="./sudoku.html";
            } 
        }
    })()
 });

//función que permite borrar los datos de localStorage cada vez que se recarga la página index.html
function limpiarSudokuStorage() {
    localStorage.clear();
}
limpiarSudokuStorage();






