// Função para criar uma barra de pesquisa e colocá-la no placeholder
function createSearchBar() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Pesquisar exercícios...';
    searchInput.className = 'search-input';

    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search search-icon'; // Ícone do Font Awesome

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);

    // Insere a barra de pesquisa dentro da navbar, entre o logo e o botão de tema
    const navbar = document.querySelector('.navbar .container-fluid');
    const themeToggleButton = document.querySelector('#theme-toggle');

    // Coloca a barra de pesquisa entre o logo e o botão de alternar tema
    navbar.insertBefore(searchContainer, themeToggleButton);

    // Adiciona o evento de pesquisa
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterExercises(query);
    });
}

// Função para filtrar exercícios
function filterExercises(query) {
    const exercises = document.querySelectorAll('.exercise-card'); // Seleciona todos os cards de exercício
    exercises.forEach(exercise => {
        const name = exercise.querySelector('h3').textContent.toLowerCase();
        const category = exercise.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
        const force = exercise.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
        const equipment = exercise.querySelector('p:nth-of-type(3)').textContent.toLowerCase();
        const primaryMuscles = exercise.querySelector('p:nth-of-type(4)').textContent.toLowerCase();
        const secondaryMuscles = exercise.querySelector('p:nth-of-type(5)').textContent.toLowerCase();

        if (name.includes(query) || category.includes(query) || force.includes(query) || equipment.includes(query) || primaryMuscles.includes(query) || secondaryMuscles.includes(query)) {
            exercise.style.display = 'block'; // Mostra o exercício se a consulta corresponder
        } else {
            exercise.style.display = 'none'; // Esconde o exercício se não corresponder
        }
    });
}

// Chama a função para criar a barra de pesquisa quando a página carrega
createSearchBar();
