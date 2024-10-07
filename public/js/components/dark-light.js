const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
    // Adiciona a classe para a animação de rotação
    themeIcon.classList.add('rotate');

    // Alterna entre ícones de sol e lua
    if (themeIcon.classList.contains('fa-sun')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Remove a classe de rotação após a animação terminar (500ms)
    setTimeout(() => {
        themeIcon.classList.remove('rotate');
    }, 500);

    // Alterna o tema da página (modo claro/escuro)
    document.body.classList.toggle('dark-mode');
});
