
$(document).ready(function() {
    var token = "GA240516160045";
    var api = "https://script.google.com/macros/s/AKfycbyoBhxuklU5D3LTguTcYAS85klwFINHxxd-FroauC4CmFVvS0ua/exec";

    $("form").on('submit', function(event) {
        // Si el formulario es inválido, evita el envío
        if (!this.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // Validación adicional para el número de celular
            var celular = $("#txt_celular").val();
            if (isNaN(celular) || celular.length != 11) {
                event.preventDefault();
                event.stopPropagation();
                alert('El teléfono debe tener exactamente 11 caracteres y solo contener números. Ej. 56966112233');
                return;
            }

            // Si es válido, realiza el envío del pedido
            var salsas = [];
            var numSalsasSeleccionadas = 0;
            var salsa1 = $("#salsa1").val();
            if (salsa1 !== 'sin_salsa' && numSalsasSeleccionadas < 2) {
                salsas.push(salsa1);
                numSalsasSeleccionadas++;
            }
            var salsa2 = $("#salsa2").val();
            if (salsa2 !== 'sin_salsa' && numSalsasSeleccionadas < 2) {
                salsas.push(salsa2);
                numSalsasSeleccionadas++;
            }
            var toping = $("#toping").val();
            var crema = $("#crema").val();
            var tipo_pedido = $("#tipo_pedido").val();
            var base = $("#whatsapp").val();
            var helado = $("#helado").val();
            var precio = calcularPrecio();

            var mensaje = "*Pedido:* Tipo: " + tipo_pedido;
            mensaje += ", Base: " + base;
            mensaje += ", Salsas: " + (salsas.length > 0 ? salsas.join(", ") : "Ninguna");
            mensaje += ", Toping: " + toping;
            mensaje += ", Crema: " + crema;
            mensaje += ", Helado: " + helado;
            if (helado === "si") {
                mensaje += ", Sabor de Helado: " + $("#sabores_helado").val();
            }
            mensaje += ", Precio: $" + precio;

            var payload = {
                "op": "registermessage",
                "token_qr": token,
                "mensajes": [
                    {"numero": celular, "mensaje": mensaje}
                ]
            };
            $.ajax({
                url: api,
                jsonp: "callback",
                method: 'POST',
                data: JSON.stringify(payload),
                async: false,
                success: function(respuestaSolicitud) {
                    alert(respuestaSolicitud.message);
                }
            });
        }

        this.classList.add('was-validated');
    });
});

function calcularPrecio() {
    var tipo_pedido = $("#tipo_pedido").val();
    var base = $("#whatsapp").val();
    var helado = $("#helado").val();
    var precio = 0;

    if (tipo_pedido === "torta_waffle") {
        if (base === "nutella") {
            precio += 13000;
        } else if (base === "manjar") {
            precio += 12000;
        } else if (base === "ambos") {
            precio += 14000;
        }
    } else {
        if (base === "nutella") {
            precio += 3800;
        } else if (base === "manjar") {
            precio += 3300;
        } else if (base === "ambos") {
            precio += 4000;
        }
    }

    if (helado === "si") {
        precio += 900;
    }

    document.getElementById("precio").innerText = "Precio: $" + precio;
    return precio;
}

function mostrarOpcionesHelado() {
    var helado = $('#helado').val();
    if (helado === 'si') {
        $('#opciones_helado').show();
    } else {
        $('#opciones_helado').hide();
    }
    calcularPrecio();
}
