// script.js
let empresaActual = '';
let rolActual = '';

const usuarios = [
    { username: 'admin', password: 'adminpass', empresa: 'Admin', rol: 'admin' },
    { username: 'empresa1', password: 'password1', empresa: 'Empresa1', rol: 'cliente', multiplicador: 1.7 },
    { username: 'empresa2', password: 'password2', empresa: 'Empresa2', rol: 'cliente', multiplicador: 1.1 }
];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuario = usuarios.find(user => user.username === username && user.password === password);

    if (usuario) {
        empresaActual = usuario.empresa;
        rolActual = usuario.rol;
        document.getElementById('empresa').value = empresaActual;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('comprasSection').style.display = 'block';
        mostrarRegistros();
        if (rolActual === 'cliente') {
            restringirCampos();
        }
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}
function restringirCampos() {
    document.getElementById('invProveed').readOnly = true;
    document.getElementById('trafo').readOnly = true;
    document.getElementById('precioVentaUnit').readOnly = true;
    document.getElementById('precioTotal').readOnly = true;
    document.getElementById('precioEnInv').readOnly = true;
    document.getElementById('valorInvoice').readOnly = true;
    document.getElementById('nroInv').readOnly = true;
    document.getElementById('recibida').readOnly = true;
    document.getElementById('guia').readOnly = true;
}

function calcularTotales() {
    var qty = parseFloat(document.getElementById('qty').value) || 0;
    var usUnit = parseFloat(document.getElementById('usUnit').value) || 0;
    var multiplicador = usuarios.find(user => user.empresa === empresaActual).multiplicador;
    var precioVentaUnit = usUnit * multiplicador;
    
    document.getElementById('usTotal').value = (qty * usUnit).toFixed(2);
    document.getElementById('precioVentaUnit').value = precioVentaUnit.toFixed(2);
    document.getElementById('precioTotal').value = (qty * precioVentaUnit).toFixed(2);
}

function agregarRegistro() {
    const registro = {
        nroPedido: document.getElementById('nroPedido').value,
        fecha: document.getElementById('fecha').value,
        empresa: document.getElementById('empresa').value,
        qty: document.getElementById('qty').value,
        partNumber: document.getElementById('partNumber').value,
        descripcion: document.getElementById('descripcion').value,
        proveedor: document.getElementById('proveedor').value,
        usUnit: document.getElementById('usUnit').value,
        usTotal: document.getElementById('usTotal').value,
        invProveed: document.getElementById('invProveed').value,
        trafo: document.getElementById('trafo').value,
        precioVentaUnit: document.getElementById('precioVentaUnit').value,
        precioTotal: document.getElementById('precioTotal').value,
        precioEnInv: document.getElementById('precioEnInv').value,
        valorInvoice: document.getElementById('valorInvoice').value,
        nroInv: document.getElementById('nroInv').value,
        recibida: document.getElementById('recibida').value,
        guia: document.getElementById('guia').value
    };

    console.log('Datos a enviar:', registro); // Verificar los datos antes de enviarlos

    fetch('http://localhost:3000/api/registros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registro)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Respuesta del servidor:', data); // Verificar la respuesta del servidor
        // Aquí puedes agregar código para actualizar la tabla de registros
    })
    .catch(error => console.error('Error:', error));
}

function mostrarRegistros() {
    fetch('http://localhost:3000/api/registros')
        .then(response => response.json())
        .then(data => {
            var table = document.getElementById('registrosTable').getElementsByTagName('tbody')[0];
            table.innerHTML = ''; // Limpiar la tabla antes de agregar los registros

            data.forEach((registro, index) => {
                var newRow = table.insertRow();

                newRow.insertCell(0).innerHTML = registro.nroPedido;
                newRow.insertCell(1).innerHTML = registro.fecha;
                newRow.insertCell(2).innerHTML = registro.empresa;
                newRow.insertCell(3).innerHTML = registro.qty;
                newRow.insertCell(4).innerHTML = registro.partNumber;
                newRow.insertCell(5).innerHTML = registro.descripcion;
                newRow.insertCell(6).innerHTML = registro.proveedor;
                newRow.insertCell(7).innerHTML = registro.usUnit;
                newRow.insertCell(8).innerHTML = registro.usTotal;
                newRow.insertCell(9).innerHTML = registro.invProveed;
                newRow.insertCell(10).innerHTML = registro.trafo;
                newRow.insertCell(11).innerHTML = registro.precioVentaUnit;
                newRow.insertCell(12).innerHTML = registro.precioTotal;
                newRow.insertCell(13).innerHTML = registro.precioEnInv;
                newRow.insertCell(14).innerHTML = registro.valorInvoice;
                newRow.insertCell(15).innerHTML = registro.nroInv;
                newRow.insertCell(16).innerHTML = registro.recibida;
                newRow.insertCell(17).innerHTML = registro.guia;

                if (rolActual === 'admin') {
                    var accionesCell = newRow.insertCell(18);
                    var editButton = document.createElement('button');
                    editButton.innerHTML = 'Editar';
                    editButton.onclick = function() {
                        editarRegistro(index);
                    };
                    accionesCell.appendChild(editButton);
                }
            });
        })
        .catch(error => console.error('Error:', error));
}
function editarRegistro(index) {
    var registros = JSON.parse(localStorage.getItem('registros')) || [];
    var registro = registros[index];
    
    document.getElementById('editIndex').value = index;
    document.getElementById('editNroPedido').value = registro.nroPedido;
    document.getElementById('editFecha').value = registro.fecha;
    document.getElementById('editEmpresa').value = registro.empresa;
    document.getElementById('editQty').value = registro.qty;
    document.getElementById('editPartNumber').value = registro.partNumber;
    document.getElementById('editDescripcion').value = registro.descripcion;
    document.getElementById('editProveedor').value = registro.proveedor;
    document.getElementById('editUsUnit').value = registro.usUnit;
    document.getElementById('editUsTotal').value = registro.usTotal;
    document.getElementById('editInvProveed').value = registro.invProveed;
    document.getElementById('editTrafo').value = registro.trafo;
    document.getElementById('editPrecioVentaUnit').value = registro.precioVentaUnit;
    document.getElementById('editPrecioTotal').value = registro.precioTotal;
    document.getElementById('editPrecioEnInv').value = registro.precioEnInv;
    document.getElementById('editValorInvoice').value = registro.valorInvoice;
    document.getElementById('editNroInv').value = registro.nroInv;
    document.getElementById('editRecibida').value = registro.recibida;
    document.getElementById('editGuia').value = registro.guia;
    
    document.getElementById('editSection').style.display = 'block';
}

function guardarEdicion() {
    var index = document.getElementById('editIndex').value;
    var registros = JSON.parse(localStorage.getItem('registros')) || [];
    
    registros[index].nroPedido = document.getElementById('editNroPedido').value;
    registros[index].fecha = document.getElementById('editFecha').value;
    registros[index].empresa = document.getElementById('editEmpresa').value;
    registros[index].qty = document.getElementById('editQty').value;
    registros[index].partNumber = document.getElementById('editPartNumber').value;
    registros[index].descripcion = document.getElementById('editDescripcion').value;
    registros[index].proveedor = document.getElementById('editProveedor').value;
    registros[index].usUnit = document.getElementById('editUsUnit').value;
    registros[index].usTotal = document.getElementById('editUsTotal').value;
    registros[index].invProveed = document.getElementById('editInvProveed').value;
    registros[index].trafo = document.getElementById('editTrafo').value;
    registros[index].precioVentaUnit = document.getElementById('editPrecioVentaUnit').value;
    registros[index].precioTotal = document.getElementById('editPrecioTotal').value;
    registros[index].precioEnInv = document.getElementById('editPrecioEnInv').value;
    registros[index].valorInvoice = document.getElementById('editValorInvoice').value;
    registros[index].nroInv = document.getElementById('editNroInv').value;
    registros[index].recibida = document.getElementById('editRecibida').value;
    registros[index].guia = document.getElementById('editGuia').value;
    
    localStorage.setItem('registros', JSON.stringify(registros));
    
    document.getElementById('editSection').style.display = 'none';
    mostrarRegistros();
}
