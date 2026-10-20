
const boton = document.querySelector("#abrirCarta");
const botonbbita = document.querySelector("#imgbbita");
const mensaje = document.querySelector("#mensaje");
const titulo = document.querySelector("#titulo");
const textoCarta = document.querySelector("#textoCarta");
const firma = document.querySelector(".firma");
const emojis = ["💗", "💕", "😻", "❤️", "💖"];
const fotos = [
    "img/cat/gatita.jpg",
    "img/cat/gatita2.jpg",
    "img/cat/gatita3.jpg",
    "img/cat/gatita4.jpg",
    "img/cat/gatita5.jpg",
    "img/cat/gatita6.jpg",
    "img/cat/gatita7.jpg",
    "img/cat/gatita8.jpg",
    "img/cat/gatita9.jpg",
    "img/cat/gatita10.jpg",
    "img/cat/gatita11.jpg",
    "img/cat/gatita12.jpg",
    "img/cat/gatita13.jpg",

];
const imagenGatita = document.querySelector("#imgbbita img");
let indiceFoto = 0;
let cambiandoFoto = false;
let indice = 0;
let contenidoCarta = "";

async function cargarCarta() {
    const respuesta = await fetch("carta.txt");
    if (!respuesta.ok) {
        throw new Error("No se pudo cargar carta.txt");
    }
    contenidoCarta = await respuesta.text();
}


function escribirCarta() {
    if (indice < contenidoCarta.length) {
        textoCarta.textContent += contenidoCarta[indice];
        indice++;
        setTimeout(escribirCarta, 60);
    } else {
        setTimeout(() => {
            botonbbita.classList.add("mostrar");
            firma.classList.add("mostrar");
        }, 1000);
    }
}


boton.addEventListener("click", () => {
    boton.classList.add("abierta");
    titulo.classList.add("oculto");
    setTimeout(() => {
        boton.style.display = "none";
        titulo.style.display = "none";
        mensaje.classList.add("visible");
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                mensaje.classList.add("aparecer");
                cargarCarta()
                    .then(() => {
                        escribirCarta();
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        textoCarta.textContent = "No se pudo cargar la carta 💔";
                    });
            });
        });

    }, 800);
});

botonbbita.addEventListener("click", () => {
    if (cambiandoFoto) return;
    cambiandoFoto = true;
    imagenGatita.classList.add("desvanecer");
    setTimeout(() => {
        indiceFoto = (indiceFoto + 1) % fotos.length;
        imagenGatita.src = fotos[indiceFoto];
        if (imagenGatita.complete && imagenGatita.naturalWidth > 0) {
            imagenGatita.classList.remove("desvanecer");
        } else {
            imagenGatita.addEventListener("load", () => {
                imagenGatita.classList.remove("desvanecer");
            }, { once: true });
        }
        setTimeout(() => {
            cambiandoFoto = false;
        }, 400);
    }, 400);
    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement("span");
        emoji.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];
        emoji.classList.add("emoji-flotante");
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.top = Math.random() * 100 + "vh";
        emoji.style.animationDelay =
            Math.random() * 1.5 + "s";
        document.body.appendChild(emoji);
        setTimeout(() => {
            emoji.remove();
        }, 3000);
    }
});