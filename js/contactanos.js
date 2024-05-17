$(document).ready(function() {
    $('#contactoForm').validate({
      rules: {
        nombre: {
          required: true
        },
        apellido: {
          required: true
        },
        correo: {
          required: true,
          email: true
        },
        telefono: {
          required: true,
          minlength: 9,
          digits: true
        },
        direccion: {
          required: true
        },
        mensaje: {
          required: true,
          minlength: 5
        }
      },
      messages: {
        nombre: "Por favor, ingresa tu nombre",
        apellido: "Por favor, ingresa tu apellido",
        correo: {
          required: "Por favor, ingresa tu correo electrónico",
          email: "Por favor, ingresa un correo electrónico válido"
        },
        telefono: {
          required: "Por favor, ingresa tu número de teléfono",
          minlength: "El número de teléfono debe tener al menos 9 dígitos",
          digits: "Por favor, ingresa solo números"
        },
        direccion: "Por favor, ingresa tu dirección",
        mensaje: {
          required: "Por favor, ingresa tu mensaje",
          minlength: "El mensaje debe contener al menos 5 palabras"
        }
      },
      errorElement: 'div',
      errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
      },
      highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid').removeClass('is-valid');
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid').addClass('is-valid');
      }
    });
  });