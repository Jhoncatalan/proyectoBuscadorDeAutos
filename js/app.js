
// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los datos de busqueda
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 11;

console.log (max);
console.log (min);

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : '',
}


document.addEventListener('DOMContentLoaded', () => {
    // muestra los automoviles al cargar
    mostrarAutos(autos);
    
    // llena las opciones de años
    llenarSelect();
})

// eventos para los select
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})


year.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt (e.target.value);
    filtrarAuto();
})


minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = parseInt (e.target.value);
    filtrarAuto();
})


maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})


puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt (e.target.value);
    filtrarAuto();
})


transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})


color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();

    console.log(datosBusqueda);
})


// Funciones
function mostrarAutos (autos) {

    limpiarHtml(); // elimina el html previo
    autos.forEach (auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHtml = document.createElement('p');
        autoHtml.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} puertas - transmision: ${transmision} - precio: ${precio} - color: ${color}
        
        `
        // insertarlo en el Html
        resultado.appendChild(autoHtml);
    })
}

// limpiar html
function limpiarHtml () {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}


// muestra el año
function llenarSelect () {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        
        // agrega los años al select
        year.appendChild(opcion);
    }
}

// funcion que filtra en base a la busqueda
function filtrarAuto () {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
    
}

function noResultado () {

    limpiarHtml();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay Resultados Intenta con otras busquedas'

    resultado.appendChild(noResultado);
}

function filtrarMarca (auto) {
    const {marca} = datosBusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear (auto) {
    const {year} = datosBusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo (auto) {
    const {minimo} = datosBusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo (auto) {
    const {maximo} = datosBusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas (auto) {
    const {puertas} = datosBusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision (auto) {
    const {transmision} = datosBusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor (auto) {
    const {color} = datosBusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}

