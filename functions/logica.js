class Ingrediente {
    constructor(nombre, categoria = "", imagen = "") {
        this.nombre = nombre;
        this.categoria = categoria || "Personalizado";
        this.imagen = imagen || "https://cdn-icons-png.flaticon.com/512/753/753839.png";
    }
}

class AlmacenamientoLocal {
    constructor(clave) {
        this.clave = clave;
    }

    obtenerLista() {
        const datos = localStorage.getItem(this.clave);
        return datos ? JSON.parse(datos) : [];
    }

    actualizarLista(lista) {
        localStorage.setItem(this.clave, JSON.stringify(lista));
    }

    eliminarTodo() {
        localStorage.removeItem(this.clave);
    }
}

class ListaCompras {
    constructor(listaDOM, ingredientesDisponibles, storage) {
        this.listaDOM = listaDOM;
        this.ingredientesDisponibles = ingredientesDisponibles;
        this.storage = storage;
        this.lista = this.storage.obtenerLista();
        this.render();
    }

    agregar(nombre) {
        const encontrado = this.ingredientesDisponibles.find(i => i.nombre.toLowerCase() === nombre.toLowerCase());
        const nuevo = encontrado
            ? new Ingrediente(encontrado.nombre, encontrado.categoria, encontrado.imagen)
            : new Ingrediente(nombre);

        this.lista.push(nuevo);
        this.actualizar();
    }

    eliminar(index) {
        this.lista.splice(index, 1);
        this.actualizar();
    }

    limpiar() {
        this.lista = [];
        this.actualizar();
    }

    actualizar() {
        this.storage.actualizarLista(this.lista);
        this.render();
    }

    render() {
        this.listaDOM.innerHTML = "";
        this.lista.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "d-flex rounded bg-white p-2 ms-3 me-3 shadow";
            div.innerHTML = `
                <div class="d-flex align-items-center w-100">
                    <img height="80" width="80" class="rounded" style="object-fit: cover;" src="${item.imagen}"  onError="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/753/753839.png';">
                    <div class="d-flex flex-column ps-3">
                        <h4>${item.nombre}</h4>
                        <p class="text-success mb-0">${item.categoria}</p>
                    </div>
                    <button class="btn rounded btn-danger ms-auto p-3" onclick="listaCompras.eliminar(${index})"><i class="bi bi-trash"></i></button>
                </div>
            `;
            this.listaDOM.appendChild(div);
        });
    }
}

// === Datos iniciales
const ingredientesDisponibles = [
    { nombre: "Zanahorias", categoria: "Verduras frescas", imagen: "https://th.bing.com/th/id/OIP.ZIZkZ8LFERnX8UE0KyAeNAHaEK?w=292&h=180&c=7&r=0&o=5&pid=1.7" },
    { nombre: "Tomate", categoria: "Verduras frescas", imagen: "https://th.bing.com/th/id/OIP.Cj3KMUtdBthIGOmhDW4QAwHaE8?w=294&h=196&c=7&r=0&o=5&pid=1.7" },
    { nombre: "Tomate Cherry", categoria: "Verduras frescas", imagen: "https://th.bing.com/th/id/R.84b31d79f21b3fa363aed532d84d5a03?rik=7N2prfL1JfmRbg&pid=ImgRaw&r=0" },
    { nombre: "Cebolla", categoria: "Verduras frescas", imagen: "https://pixabay.com/es/photos/cebolla-amarilla-vegetal-verdura-163971/" },
    { nombre: "Cebolla Caramelizada Mercadona", categoria: "Conservas y salsas", imagen: "https://tienda.mercadona.es/product/52749/cebolla-caramelizada-hacendado-con-aceite-oliva-tarro" },
    { nombre: "Salchichas", categoria: "Carnes y embutidos", imagen: "https://pixabay.com/es/photos/salchichas-alimentos-cocinar-114897/" },
    { nombre: "Pan Hotdog", categoria: "Panadería y bollería", imagen: "https://pixabay.com/es/photos/pan-de-perrito-caliente-160922/" },
    { nombre: "Ketchup", categoria: "Salsas y condimentos", imagen: "https://pixabay.com/es/photos/ketchup-salsa-tomate-137470/" },
    { nombre: "Mayonesa", categoria: "Salsas y condimentos", imagen: "https://www.freepik.es/fotos-vectores-gratis/mayonesa" },
    { nombre: "Palomitas", categoria: "Snacks y aperitivos", imagen: "https://www.huffingtonpost.es/sociedad/muchos-equivocan-preparar-palomitas-dejandose-paso-crucial-maiz-explote.html" },
    { nombre: "Nueces", categoria: "Frutos secos", imagen: "https://pixabay.com/es/photos/nuez-fruto-seco-nuez-de-almendra-104915/" },
    { nombre: "Avellanas", categoria: "Frutos secos", imagen: "https://pixabay.com/es/images/search/avellanas/" },
    { nombre: "Chicles", categoria: "Dulces y golosinas", imagen: "https://pixabay.com/es/photos/chicle-goma-de-masticar-138378/" },
    { nombre: "Yogur Griego", categoria: "Lácteos", imagen: "https://www.freepik.es/fotos-vectores-gratis/yogur-griego" },
    { nombre: "Cereales", categoria: "Desayunos y cereales", imagen: "https://pixabay.com/es/images/search/cereales/" },
    { nombre: "Papel Higiénico", categoria: "Higiene y limpieza", imagen: "https://www.freepik.es/fotos-vectores-gratis/papel-higienico" },
    { nombre: "Agua", categoria: "Bebidas", imagen: "https://cadenaser.com/cataluna/2025/04/10/font-vella-celebra-150-anos-llenando-las-mesas-de-vida-con-una-exposicion-que-une-arte-tradicion-y-futuro-sercat/" },
    { nombre: "Leche", categoria: "Lácteos", imagen: "https://elpais.com/gente/2024-12-31/el-vestido-de-cristina-pedroche-en-las-campanadas-2024-un-alegato-por-la-proteccion-de-la-infancia-creado-a-partir-de-su-leche-materna.html" },
    { nombre: "Lechuga", categoria: "Verduras frescas", imagen: "https://pixabay.com/es/photos/lechuga-ensalada-vegetales-vegetal-163971/" },
    { nombre: "Aceite de Oliva", categoria: "Aceites y vinagres", imagen: "https://www.aceitesalicante.com/wp-content/uploads/2021/09/aceite-de-oliva.jpg" },
    { nombre: "Aceite Virgen", categoria: "Aceites y vinagres", imagen: "https://www.theolivecentre.com.au/wp-content/uploads/2020/12/virgin-olive-oil.jpg" },
    { nombre: "Galletas María", categoria: "Dulces y golosinas", imagen: "https://www.historicimages.com/galletas-maria.jpg" },
    { nombre: "Fresas", categoria: "Frutas frescas", imagen: "https://pixabay.com/es/photos/fresas-2987470/" },
    { nombre: "Melon", categoria: "Frutas frescas", imagen: "https://pixabay.com/es/photos/melón-fruta-sandía-1786347/" },
    { nombre: "Sandia", categoria: "Frutas frescas", imagen: "https://pixabay.com/es/photos/sandía-fruta-corte-comida-1717106/" },
    { nombre: "Melocoton", categoria: "Frutas frescas", imagen: "https://pixabay.com/es/photos/melocotones-fruta-comida-1613452/" },
    { nombre: "Manzana", categoria: "Frutas frescas", imagen: "https://pixabay.com/es/photos/manzana-roja-fruta-naturaleza-370839/" },
    { nombre: "Platano", categoria: "Frutas frescas", imagen: "https://pixabay.com/es/photos/plátano-fruta-amarillo-1420934/" },
    { nombre: "Pepino", categoria: "Verduras frescas", imagen: "https://pixabay.com/es/photos/pepino-vegetal-alimentos-1651481/" },
    { nombre: "Pepinillos en Vinagre", categoria: "Conservas y salsas", imagen: "https://pixabay.com/es/photos/pepino-encurtidos-alimentos-3279639/" },
    { nombre: "Aceitunas", categoria: "Frutos secos y conservas", imagen: "https://pixabay.com/es/photos/aceitunas-oliva-fruta-verde-1044986/" },
    { nombre: "Patatas", categoria: "Verduras frescas", imagen: "https://pixabay.com/es/photos/patata-alimento-comida-163971/" },
    { nombre: "Patatas Bravas", categoria: "Snacks y aperitivos", imagen: "https://pixabay.com/es/photos/patatas-bravas-comida-1333196/" },
    { nombre: "Pizza", categoria: "Platos preparados", imagen: "https://pixabay.com/es/photos/pizza-alimento-comida-2214208/" },
    { nombre: "Kebab", categoria: "Platos preparados", imagen: "https://pixabay.com/es/photos/kebab-comida-grill-1081680/" },
    { nombre: "Pañuelos", categoria: "Higiene y limpieza", imagen: "https://pixabay.com/es/photos/pañuelos-higiene-papel-1517316/" },
    { nombre: "Toallitas", categoria: "Higiene y limpieza", imagen: "https://pixabay.com/es/photos/toallitas-1396604/" },
    { nombre: "Servilletas", categoria: "Higiene y limpieza", imagen: "https://pixabay.com/es/photos/servilletas-1449730/" },
    { nombre: "Queso", categoria: "Lácteos", imagen: "https://pixabay.com/es/photos/queso-dos-trozos-bloques-2534216/" },
    { nombre: "Queso en Lonchas", categoria: "Lácteos", imagen: "https://pixabay.com/es/photos/queso-lonchas-1449734/" },
    { nombre: "Pavo", categoria: "Carnes y embutidos", imagen: "https://pixabay.com/es/photos/pavo-comida-carne-1393196/" },
    { nombre: "Atún", categoria: "Pescados y mariscos", imagen: "https://pixabay.com/es/photos/atún-pescado-comida-saludable-1775856/" },
    { nombre: "Merluza", categoria: "Pescados y mariscos", imagen: "https://pixabay.com/es/photos/merluza-pescado-3020155/" },
    { nombre: "Salmón", categoria: "Pescados y mariscos", imagen: "https://pixabay.com/es/photos/salmón-pescado-mariscos-1757915/" },
    { nombre: "Gambas", categoria: "Pescados y mariscos", imagen: "https://pixabay.com/es/photos/gambas-marisco-mar-1530340/" },
    { nombre: "Arroz", categoria: "Arroz y legumbres", imagen: "https://pixabay.com/es/photos/arroz-cereal-comida-2217255/" },
    { nombre: "Pasta", categoria: "Arroz y legumbres", imagen: "https://pixabay.com/es/photos/pasta-comida-alimento-pasta-italiana-1238720/" },
    { nombre: "Macarrones", categoria: "Arroz y legumbres", imagen: "https://pixabay.com/es/photos/macarrones-pasta-italiana-3060537/" },
    { nombre: "Fideos", categoria: "Arroz y legumbres", imagen: "https://pixabay.com/es/photos/fideos-pasta-cocinar-2112467/" },
    { nombre: "Perejil", categoria: "Especias y hierbas", imagen: "https://pixabay.com/es/photos/perejil-vegetal-hierba-verde-1535125/" },
    { nombre: "Sal", categoria: "Especias y hierbas", imagen: "https://pixabay.com/es/photos/sal-comida-sal-piedra-1821457/" },
    { nombre: "Pimienta", categoria: "Especias y hierbas", imagen: "https://pixabay.com/es/photos/pimienta-granos-de-pimienta-3055666/" },
    { nombre: "Azucar", categoria: "Especias y hierbas", imagen: "https://pixabay.com/es/photos/azúcar-blanco-alimento-azúcar-2013120/" },
    { nombre: "Magdalenas", categoria: "Panadería y bollería", imagen: "https://pixabay.com/es/photos/magdalenas-postre-3972975/" },
    { nombre: "Sobados", categoria: "Panadería y bollería", imagen: "https://pixabay.com/es/photos/sobados-pastel-panadería-2309512/" },
    { nombre: "Snacks", categoria: "Snacks y aperitivos", imagen: "https://pixabay.com/es/photos/snacks-alimentos-crujientes-2332909/" },
    { nombre: "Doritos", categoria: "Snacks y aperitivos", imagen: "https://pixabay.com/es/photos/doritos-patente-3215154/" },
    { nombre: "Anacardos", categoria: "Frutos secos", imagen: "https://pixabay.com/es/photos/anacardos-frutos-secos-nuez-1570721/" },
    { nombre: "Pipas", categoria: "Snacks y aperitivos", imagen: "https://pixabay.com/es/photos/pipas-seeds-alimentos-1041392/" },
    { nombre: "Pipas Tijuana", categoria: "Snacks y aperitivos", imagen: "https://pixabay.com/es/photos/pipas-alimentos-3933187/" },
    { nombre: "Jamón York", categoria: "Carnes y embutidos", imagen: "https://pixabay.com/es/photos/jamon-york-embutido-1513127/" },
    { nombre: "Jamón Serrano", categoria: "Carnes y embutidos", imagen: "https://pixabay.com/es/photos/jamon-serrano-embutido-comida-3215184/" },
    { nombre: "Chuches", categoria: "Dulces y golosinas", imagen: "https://pixabay.com/es/photos/chuches-golosinas-dulces-1250055/" },
    { nombre: "Verdura", categoria: "Verduras frescas", imagen: "https://pixabay.com/es/photos/verduras-vegetales-hortalizas-2491849/" },
    { nombre: "Batido de proteínas", categoria: "Bebidas", imagen: "https://pixabay.com/es/photos/batido-proteínas-1639557/" },
    { nombre: "Zumo de frutas", categoria: "Bebidas", imagen: "https://pixabay.com/es/photos/zumo-de-naranja-bebida-naranja-491213/" },
    { nombre: "Tabasco", categoria: "Salsas y condimentos", imagen: "https://pixabay.com/es/photos/tabasco-salsa-picante-1566876/" },
    { nombre: "Oregón", categoria: "Especias y hierbas", imagen: "https://pixabay.com/es/photos/oregano-planta-hierba-1116402/" },
    { nombre: "Salsa", categoria: "Salsas y condimentos", imagen: "https://pixabay.com/es/photos/salsa-picante-salsa-tomate-3472177/" },
    { nombre: "Pan integral", categoria: "Panadería", imagen: "https://th.bing.com/th/id/OIP.qsZYxGaMVdNvHRKRcQ_HNQHaE8?w=292&h=195&c=7&r=0&o=5&pid=1.7" }
];

// === Inicialización
const input = document.querySelector("input");
const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const main = document.getElementById("main-section");

const almacenamiento = new AlmacenamientoLocal("listaCompras");
const listaCompras = new ListaCompras(main, ingredientesDisponibles, almacenamiento);

// === Eventos
addBtn.addEventListener("click", () => {
    const texto = input.value.trim();
    if (texto) {
        listaCompras.agregar(texto);
        input.value = "";
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
    }
});

// Añadir también con la tecla Enter
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // evita comportamiento por defecto (por ejemplo, envío de formulario)
        const texto = input.value.trim();
        if (texto) {
            listaCompras.agregar(texto);
            input.value = "";
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
        }
    }
});

clearBtn.addEventListener("click", () => {
    if (confirm("¿Seguro que deseas borrar toda la lista?")) {
        listaCompras.limpiar();
    }
});

// === Autocompletar con datalist
const datalist = document.createElement("datalist");
datalist.id = "opcionesIngredientes";
ingredientesDisponibles.forEach(i => {
    const opt = document.createElement("option");
    opt.value = i.nombre;
    datalist.appendChild(opt);
});
document.body.appendChild(datalist);
input.setAttribute("list", "opcionesIngredientes");
