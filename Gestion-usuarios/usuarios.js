document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registroForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const usuario = {
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            contrasena: document.getElementById('contrasena').value,
            rol: document.getElementById('rol').value
        };
        localStorage.setItem(usuario.correo, JSON.stringify(usuario));
        alert('✅ Registro exitoso');
        window.location.href = 'login.html';
    });

    document.getElementById('loginForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const correo = document.getElementById('loginCorreo').value;
        const contrasena = document.getElementById('loginContrasena').value;
        const usuario = JSON.parse(localStorage.getItem(correo));
        
        if (usuario && usuario.contrasena === contrasena) {
            alert(`🎉 Bienvenido, ${usuario.nombre} (${usuario.rol})`);
            window.location.href = 'dashboard.html';
        } else {
            alert('⚠️ Correo o contraseña incorrectos');
        }
    });
});


