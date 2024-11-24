// Função para mostrar a seta ao rolar a página
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 200) { // Mostra o botão quando o scroll for maior que 200px
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Função para rolar a página até o topo
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Faz a página rolar suavemente
    });
});
