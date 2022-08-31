
/* carrito de compras */
class Carrito{
    comprarProducto(el){
        el.preventDefault();
        if(el.target.classList.contains('agregar-al-carrito')){
            const producto = el.target.parentElement.parentElement;
            this.leerDatosProducto(producto);     
        }    
    }
    leerDatosProducto(producto){
        const infoProducto={
        img:producto.querySelector('img').src,
        titulo:producto.querySelector('h4').textContent,
        precio:producto.querySelector('.precio span').textContent,
        id:producto.querySelector('a').getAttribute('data-id') ,
        cantidad:1
        }
        let productosGuardados
        productosGuardados = this.productosGuardados();
        productosGuardados.forEach(function (productosGuardado){
            if (productosGuardado.id === infoProducto.id){
                productosGuardados = productosGuardado.id;
            }
        });
        if (productosGuardados === infoProducto.id){
            Swal.fire(
                'Este producto ya esta agregado en el carrito')
        }
        else{
        this.agregarAlCarrito(infoProducto);
        }
    }
    agregarAlCarrito(producto){
        const fila =document.createElement('tr');
        fila.innerHTML = `
        <td>
            <img src="${producto.img}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
        <a href="#" data-id="${producto.id}"></a>
    </td>`;  
    listaProducto.appendChild(fila);
    this.guardarProducto(producto)
    }
    limpiarCarrito(e){
        e.preventDefault();
        while (listaProducto.firstChild) {
            listaProducto.removeChild(listaProducto.firstChild)
        }
        this.vaciarCarritoLocalStorage();
        return false;
    }
    guardarProducto(productos){
        let product;
        product = this.productosGuardados();
        product.push(productos);
        localStorage.setItem('product', JSON.stringify(product))
    }
    productosGuardados(){
        let productosGuardados;
        if (localStorage.getItem('product') === null) {
            productosGuardados = [];    
        }
        else{
            productosGuardados = JSON.parse(localStorage.getItem('product'));
            
        }
        return productosGuardados;
    }
    productosElegidosGuardados(){
        let productoDelCarro;
        productoDelCarro = this.productosGuardados();
        productoDelCarro.forEach(function (producto) {
        const fila =document.createElement('tr');
        fila.innerHTML = `
        <td>
            <img src="${producto.img}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
        <a href="#" data-id="${producto.id}"></a>
    </td>`;  
    listaProducto.appendChild(fila);}
    );
    }
    productosElegidosComprar(){
        let productoDelCarro;
        productoDelCarro = this.productosGuardados();
        productoDelCarro.forEach(function(producto) {
        const fila=document.createElement('tr');
        fila.innerHTML = `
        <td>
            <img src="${producto.img}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <a href="#" data-id="${producto.id}"></a>
    </td>`; 
    listaCompra.appendChild(fila);
});
    }
    vaciarCarritoLocalStorage(){
        localStorage.clear();
    }
    compraProducto(){
        if (this.productosGuardados().length === 0) {
            Swal.fire(
            'No hay nada en el carrito')
        }
        else {
            setTimeout ((e) => location.reload(e),1000)

        }
    }
    calcularPrecio(){
        let  productosGuardados;
        let total = 0, subTotal = 0 , iva = 0;
        productosGuardados = this.productosGuardados();
        for (let i = 0; i < productosGuardados.length; i++) {
            let element = Number(productosGuardados[i].precio*productosGuardados[i].cantidad);
            total = total + element;
        }
        iva = parseFloat(total* 0.19).toFixed(2)
        subTotal= parseFloat(total-iva).toFixed(2)

        document.getElementById('subtotal').innerHTML = "$"+ subTotal;
        document.getElementById('iva').innerHTML ="$"+ iva;
        document.getElementById('total').innerHTML ="$" +total.toFixed(2);
    }
}

/* final del carrito */

/* pedidos */
const carroDeCompra = new Carrito();
const pedido = document.getElementById('Carrito');
const productos = document.getElementById('lista-de-productos');
const listaProducto = document.querySelector('#lista-de-carrito tbody');
const vaciarCarro = document.getElementById('limpiar-carrito');
const comprarProducto = document.getElementById('comprar-producto');


function haceUnEvento() {
    productos.addEventListener('click',(e)=>{carroDeCompra.comprarProducto(e)});
    vaciarCarro.addEventListener('click', (e)=>{carroDeCompra.limpiarCarrito(e)});
    document.addEventListener('DOMContentLoaded', carroDeCompra.productosElegidosGuardados());
    comprarProducto.addEventListener('click',(e)=>{carroDeCompra.compraProducto(e)});
}

haceUnEvento();

/* compra de productos */

const comprar = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');



function comprarArticulo(){
    document.addEventListener('DOMContentLoaded',comprar.productosElegidosComprar());
    comprar.calcularPrecio();
}
comprarArticulo(); 

/* inicio de formulario  */
    const btn = document.getElementById('button');

    document.getElementById('form')
    .addEventListener('submit', function(event) {
    event.preventDefault();
    
    btn.value = 'enviando...';
    
    const serviceID = 'default_service';
    const templateID = 'template_71kt4jg';
    
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
        btn.value = 'procesar compra';
        Swal.fire(
            'se a enviado un correo a tu email');
        }, (err) => {
        btn.value = '';
        alert(JSON.stringify(err));
        });
    });

/* lista de productos */

const lista = document.querySelector('#tabla tbody')
function crearHTML(array) {
    array.forEach((list) => {
        const filas = document.createElement('tr');
        filas.innerHTML =`<th scope="row">${list.id}</th>
        <td>${list.titulo}</td>
        <td>${list.precio}</td> `;
        lista.appendChild(filas)
    })
}

fetch('./productos.json')
        .then((response) => response.json())
        .then((data) => {
            crearHTML(data);})
