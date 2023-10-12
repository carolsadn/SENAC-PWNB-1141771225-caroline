document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginStatus = document.getElementById('login-status');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        
        if (email === 'seuemail@example.com' && senha === 'suasenha') {
            loginStatus.textContent = 'Login bem-sucedido!';
            // Redirecionar o usuário para a página de destino após o login
            // window.location.href = 'pagina_de_destino.html';
        } else {
            loginStatus.textContent = 'Email ou senha incorretos. Tente novamente.';
        }
    });
});
