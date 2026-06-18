'use strict';

let PROTOCOLOS = [];
let usuarioActual = null;
let favoritos = [];
let filtroActual = 'todos';
let timerNotif = null;

const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');
const btnCarrito = document.getElementById('btn-carrito');
const numCarrito = document.getElementById('num-carrito');
const modalLogin = document.getElementById('modal-login');
const tabs = document.querySelectorAll('.modal-tabs .tab');
const panelLogin = document.getElementById('panel-login');
const panelRegistro = document.getElementById('panel-registro');
const errorLogin = document.getElementById('error-login');
const errorRegistro = document.getElementById('error-registro');
const okRegistro = document.getElementById('ok-registro');
const panelCarrito = document.getElementById('panel-carrito');
const itemsCarrito = document.getElementById('items-carrito');
const carritoVacio = document.getElementById('carrito-vacio');
const listaProductos = document.getElementById('lista-productos');
const navFiltros = document.querySelector('.filtros');
const notificacion = document.getElementById('notificacion');
const seccionHistorial = document.getElementById('historial');
const listaHistorial = document.getElementById('lista-historial');
const navHistorial = document.getElementById('nav-historial');

window.addEventListener("load", () => {
    const guardado = localStorage.getItem("usuarioActual");
    if (guardado) {
        usuarioActual = guardado;
        actualizarUI();
    }
    cargarProtocolos();
});

async function cargarProtocolos() {
    try {
        const res = await fetch('API/protocolos.php');
        PROTOCOLOS = await res.json();
        mostrarProtocolos('todos');
    } catch (e) {
        listaProductos.innerHTML = '<p class="error">Error al conectar con la base de datos.</p>';
    }
}

function mostrarProtocolos(filtro) {
    filtroActual = filtro;
    const filtrados = filtro === 'todos' ? PROTOCOLOS : PROTOCOLOS.filter(p => p.capa === filtro);

    listaProductos.innerHTML = filtrados.map(p => `
        <article class="tarjeta">
            <img src="${p.imagen}" alt="${p.nombre}" class="img-producto">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p class="precio">Puerto: ${p.puerto || 'N/A'}</p>
            <button data-id="${p.id}">${usuarioActual ? 'Añadir a marcadores' : 'Inicia sesión para guardar'}</button>
        </article>
    `).join('');

    listaProductos.querySelectorAll('button[data-id]').forEach(btn => {
        btn.addEventListener('click', () => anadirAFavoritos(Number(btn.dataset.id)));
    });
}

document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario = document.getElementById('input-usuario').value.trim();
    const password = document.getElementById('input-contrasena').value;

    try {
        const res = await fetch("API/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, password })
        });
        const data = await res.json();

        if (data.ok) {
            usuarioActual = usuario;
            localStorage.setItem('usuarioActual', usuario);
            modalLogin.close();
            actualizarUI();
            mostrarNotificacion(`Bienvenido, ${usuario}`);
            document.getElementById('form-login').reset();
        } else {
            errorLogin.textContent = data.msg;
            errorLogin.hidden = false;
        }
    } catch (err) {
        errorLogin.textContent = 'Error de conexión';
        errorLogin.hidden = false;
    }
});

document.getElementById('form-registro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario = document.getElementById('reg-usuario').value.trim();
    const password = document.getElementById('reg-contrasena').value;
    const pass2 = document.getElementById('reg-contrasena2').value;

    if (password !== pass2) {
        errorRegistro.textContent = 'Las contraseñas no coinciden';
        errorRegistro.hidden = false;
        return;
    }

    try {
        const res = await fetch("API/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, password })
        });
        const data = await res.json();

        if (data.ok) {
            okRegistro.hidden = false;
            errorRegistro.hidden = true;
            document.getElementById('form-registro').reset();
            setTimeout(() => cambiarTab('login'), 1500);
        } else {
            errorRegistro.textContent = data.msg;
            errorRegistro.hidden = false;
        }
    } catch (err) {
        errorRegistro.textContent = 'Error de conexión';
        errorRegistro.hidden = false;
    }
});

function actualizarUI() {
    const logueado = !!usuarioActual;
    btnLogin.hidden = logueado;
    btnLogout.hidden = !logueado;
    btnCarrito.hidden = !logueado;
    seccionHistorial.hidden = !logueado;
    navHistorial.hidden = !logueado;
    mostrarProtocolos(filtroActual);
    if (logueado) cargarMisFavoritos();
}

btnLogout.addEventListener('click', () => {
    usuarioActual = null;
    favoritos = [];
    localStorage.removeItem("usuarioActual");
    panelCarrito.hidden = true;
    actualizarUI();
    actualizarContador();
    mostrarNotificacion('Sesión cerrada');
});

function anadirAFavoritos(id) {
    if (!usuarioActual) {
        cambiarTab('login');
        modalLogin.showModal();
        return;
    }
    const protocolo = PROTOCOLOS.find(p => Number(p.id) === id);
    if (!favoritos.find(f => f.id === id)) {
        favoritos.push(protocolo);
        actualizarContador();
        renderizarFavoritos();
        mostrarNotificacion(`${protocolo.nombre} añadido a marcadores`);
    } else {
        mostrarNotificacion(`${protocolo.nombre} ya está en marcadores`);
    }
}

function actualizarContador() {
    numCarrito.textContent = favoritos.length;
}

function renderizarFavoritos() {
    if (favoritos.length === 0) {
        itemsCarrito.innerHTML = '';
        carritoVacio.hidden = false;
        return;
    }
    carritoVacio.hidden = true;
    itemsCarrito.innerHTML = favoritos.map(item => `
        <article class="item-carrito">
            <span>${item.nombre}</span>
            <button data-id="${item.id}">X</button>
        </article>
    `).join('');

    itemsCarrito.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            favoritos = favoritos.filter(f => f.id !== Number(btn.dataset.id));
            actualizarContador();
            renderizarFavoritos();
        });
    });
}

document.getElementById('btn-comprar').addEventListener('click', async () => {
    if (favoritos.length === 0) return mostrarNotificacion('No hay protocolos para guardar');

    await fetch("API/guardar_favoritos.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: usuarioActual, favoritos })
    });

    mostrarNotificacion(`Favoritos guardados en la base de datos`);
    favoritos = [];
    actualizarContador();
    panelCarrito.hidden = true;
    cargarMisFavoritos();
});

async function cargarMisFavoritos() {
    try {
        const res = await fetch("API/mis_favoritos.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario: usuarioActual })
        });
        const data = await res.json();

        if (!data.ok || data.favoritos.length === 0) {
            listaHistorial.innerHTML = '<p class="muted">No tienes protocolos guardados.</p>';
            return;
        }

        const filas = data.favoritos.map(f => `
            <tr>
                <td>${new Date(f.fecha).toLocaleString('es-ES')}</td>
                <td><span class="badge-tipo">${f.capa}</span> ${f.nombre}</td>
                <td>Puerto: ${f.puerto || 'N/A'}</td>
            </tr>
        `).join('');

        listaHistorial.innerHTML = `
            <table class="historial-tabla">
                <thead><tr><th>Fecha de guardado</th><th>Protocolo</th><th>Puerto</th></tr></thead>
                <tbody>${filas}</tbody>
            </table>`;
    } catch (e) {
        listaHistorial.innerHTML = '<p class="error">Error al cargar el historial.</p>';
    }
}

navFiltros.addEventListener('click', e => {
    const btn = e.target.closest('.filtro');
    if (!btn) return;
    document.querySelectorAll('.filtro').forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');
    mostrarProtocolos(btn.dataset.cat);
});

function cambiarTab(tabName) {
    tabs.forEach(t => t.classList.toggle('activo', t.dataset.tab === tabName));
    panelLogin.hidden = tabName !== 'login';
    panelRegistro.hidden = tabName !== 'registro';
    errorLogin.hidden = true;
    errorRegistro.hidden = true;
    okRegistro.hidden = true;
}

tabs.forEach(tab => tab.addEventListener('click', () => cambiarTab(tab.dataset.tab)));
btnLogin.addEventListener('click', () => { cambiarTab('login'); modalLogin.showModal(); });
document.getElementById('btn-hero').addEventListener('click', () => document.getElementById('protocolos').scrollIntoView({behavior: "smooth"}));
document.getElementById('btn-cancelar').addEventListener('click', () => modalLogin.close());
document.getElementById('btn-cancelar-reg').addEventListener('click', () => modalLogin.close());
btnCarrito.addEventListener('click', () => { panelCarrito.hidden = false; renderizarFavoritos(); });
document.getElementById('btn-cerrar-carrito').addEventListener('click', () => panelCarrito.hidden = true);

function mostrarNotificacion(msg) {
    clearTimeout(timerNotif);
    notificacion.textContent = msg;
    notificacion.hidden = false;
    notificacion.style.animation = 'none';
    void notificacion.offsetWidth;
    notificacion.style.animation = 'fade 3s forwards';
    timerNotif = setTimeout(() => notificacion.hidden = true, 3000);
}